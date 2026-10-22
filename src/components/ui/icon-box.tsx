import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// Quadrado com um ícone dentro (pilares de "O evento", camping, estacionamento)
const iconBoxVariants = cva("relative grid shrink-0 place-items-center [&>svg]:pointer-events-none", {
  variants: {
    variant: {
      // azul-marinho com ícone dourado e "sombra" dourada embaixo
      solid: "bg-navy text-gold shadow-[0_5px_0_var(--color-gold-600)]",
      // dourado clarinho com ícone dourado escuro
      soft: "bg-gold/25 text-gold-600",
    },
    size: {
      md: "size-11 rounded-xl [&>svg]:size-[22px]",
      lg: "size-14 rounded-2xl [&>svg]:size-7",
    },
  },
  defaultVariants: { variant: "soft", size: "md" },
})

function IconBox({ className, variant, size, ...props }: React.ComponentProps<"span"> & VariantProps<typeof iconBoxVariants>) {
  return <span data-slot="icon-box" aria-hidden="true" className={cn(iconBoxVariants({ variant, size }), className)} {...props} />
}

export { IconBox, iconBoxVariants }
