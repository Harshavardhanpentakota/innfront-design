import { useEffect, useState } from "react";
import { Bell, CheckCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { notificationsApi, Notification } from "@/lib/api";
import { cn } from "@/lib/utils";

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    try {
      const data = await notificationsApi.getNotifications(1, 10);
      setNotifications(data.notifications || []);
      const countData = await notificationsApi.getUnreadCount();
      setUnreadCount(countData.count);
    } catch (err) {
      console.error("Failed to load notifications", err);
    }
  };

  useEffect(() => {
    fetchNotifications();

    let eventSource: EventSource | null = null;
    try {
      const streamUrl = notificationsApi.getStreamUrl();
      eventSource = new EventSource(streamUrl);

      eventSource.onmessage = (event) => {
        try {
          const newNotif = JSON.parse(event.data) as Notification;
          setNotifications((prev) => {
            if (prev.some(n => n._id === newNotif._id)) return prev;
            return [newNotif, ...prev.slice(0, 9)];
          });
          setUnreadCount((c) => c + 1);
        } catch (err) {
          console.error("Error reading live notification stream", err);
        }
      };

      eventSource.onerror = () => {
        // SSE auto-reconnects
      };
    } catch (err) {
      console.error("Failed to connect to SSE stream", err);
    }

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, []);

  const markAsRead = async (id: string) => {
    try {
      await notificationsApi.readNotification(id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount((c) => Math.max(0, c - 1));
    } catch (err) {
      console.error("Failed to mark as read", err);
    }
  };

  const markAllRead = async () => {
    try {
      await notificationsApi.readAll();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error("Failed to mark all as read", err);
    }
  };

  const handleNotificationClick = async (notif: Notification) => {
    if (!notif.isRead) {
      await markAsRead(notif._id);
    }
    // Navigate user to my bookings list
    navigate("/my-bookings");
  };

  const formatRelativeTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMin = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);

    if (diffMin < 1) return "Just now";
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "Yesterday";
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
          <Bell className="h-4.5 w-4.5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-destructive-foreground">
              {unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 sm:w-90 rounded-xl p-0 shadow-lg bg-popover text-popover-foreground">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
          <span className="font-semibold text-sm">Notifications</span>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center gap-1 text-xs text-primary font-medium hover:underline"
            >
              <CheckCheck className="h-3 w-3" /> Mark all read
            </button>
          )}
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="py-8 text-center text-xs text-muted-foreground">
              No notifications yet.
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif._id}
                onClick={() => handleNotificationClick(notif)}
                className={cn(
                  "flex flex-col gap-1 px-4 py-3 cursor-pointer transition-colors hover:bg-muted border-b border-border/40",
                  !notif.isRead ? "bg-primary-soft/30 font-medium" : "bg-transparent"
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className={cn("text-xs font-semibold", !notif.isRead ? "text-primary-deep" : "text-foreground")}>
                    {notif.title}
                  </span>
                  <span className="text-[10px] text-muted-foreground shrink-0 mt-0.5">
                    {formatRelativeTime(notif.createdAt)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {notif.message}
                </p>
              </div>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
