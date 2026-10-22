import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
        // variantes do evento: botão "3D" com sombra sólida que afunda ao clicar
        gold: "bg-gold font-extrabold text-navy-900 shadow-[0_5px_0_var(--color-gold-600)] hover:translate-y-px hover:shadow-[0_4px_0_var(--color-gold-600)] active:translate-y-[5px] active:shadow-none",
        navy: "bg-navy font-extrabold text-gold shadow-[0_5px_0_var(--color-navy-900)] hover:translate-y-px hover:shadow-[0_4px_0_var(--color-navy-900)] active:translate-y-[5px] active:shadow-none",
        whatsapp:
          "bg-whatsapp font-extrabold text-white shadow-[0_5px_0_var(--color-whatsapp-dark)] hover:translate-y-px hover:shadow-[0_4px_0_var(--color-whatsapp-dark)] active:translate-y-[5px] active:shadow-none",
        line: "bg-transparent font-extrabold text-current shadow-[inset_0_0_0_2px_currentColor] hover:bg-white/10",
        // ações pequenas com borda (ligar, como chegar)
        subtle: "border-[1.5px] border-border bg-card font-bold text-navy-600 hover:border-navy-600",
        booking: "bg-booking font-bold text-white hover:bg-booking-dark",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
        // tamanhos do evento (texto maior, área de toque confortável)
        cta: "h-auto gap-2 rounded-[14px] px-[22px] py-[14px] text-[17px] leading-tight",
        "cta-sm": "h-auto gap-1.5 rounded-[10px] px-3.5 py-2 text-sm leading-tight",
        "cta-lg": "h-auto gap-2 rounded-[14px] px-8 py-[18px] text-lg leading-tight",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
