import { PageLayout } from "@/components/layout/PageLayout";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CancellationPolicy = () => (
  <PageLayout>
    <section className="border-b border-border bg-muted/40 py-12">
      <div className="container-page">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
        </Link>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Policies</span>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">Cancellation Policy</h1>
      </div>
    </section>

    <section className="container-page py-12 max-w-3xl">
      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft space-y-4">
          <h2 className="font-display text-xl font-semibold">Refund Structure</h2>
          <p className="text-muted-foreground text-sm">All refunds are calculated based on the time of cancellation prior to check-in date.</p>

          <div className="space-y-3">
            <div className="flex items-start gap-4 rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950/30">
              <div className="shrink-0 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-900 dark:text-green-300">100%</div>
              <div>
                <div className="font-semibold text-sm">Full Refund</div>
                <div className="text-xs text-muted-foreground mt-0.5">Cancelled more than <strong>48 hours</strong> before check-in</div>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900 dark:bg-yellow-950/30">
              <div className="shrink-0 rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">80%</div>
              <div>
                <div className="font-semibold text-sm">Partial Refund</div>
                <div className="text-xs text-muted-foreground mt-0.5">Cancelled between <strong>48 hours and 24 hours</strong> before check-in</div>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/30">
              <div className="shrink-0 rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700 dark:bg-red-900 dark:text-red-300">0%</div>
              <div>
                <div className="font-semibold text-sm">No Refund</div>
                <div className="text-xs text-muted-foreground mt-0.5">Cancelled within <strong>24 hours</strong> of check-in or no-show</div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="font-display text-xl font-semibold mb-3">Management Cancellation</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            In the rare event that the management needs to cancel a booking before 24 hours of check-in, a <strong>full refund</strong> will be issued to the guest promptly.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="font-display text-xl font-semibold mb-3">How to Cancel</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            To cancel your booking, please visit the <Link to="/my-bookings" className="text-primary hover:underline">My Bookings</Link> page and click the cancel option on your booking, or contact us directly at{" "}
            <a href="tel:+918247786920" className="text-primary hover:underline">+91 82477 86920</a> or{" "}
            <a href="mailto:abhitejinn11@gmail.com" className="text-primary hover:underline">abhitejinn11@gmail.com</a>.
          </p>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default CancellationPolicy;
