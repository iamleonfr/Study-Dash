import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground",
        planned: "bg-info/10 text-info",
        "in-progress": "bg-warning/10 text-warning",
        completed: "bg-success/10 text-success",
        work: "bg-primary/10 text-primary",
        study: "bg-accent/10 text-accent",
        personal: "bg-muted text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const StatusBadge = ({ className, variant, ...props }: StatusBadgeProps) => {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
};

export { StatusBadge, badgeVariants };
