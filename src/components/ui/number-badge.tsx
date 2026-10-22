import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// Número dentro de um círculo (passos da inscrição, número de cada hotel no mapa)
const numberBadgeVariants = cva("grid shrink-0 place-items-center rounded-full font-black", {
  variants: {
    variant: {
      gold: "bg-gold text-navy-900",
      // a cor de fundo vem de fora (ex.: faixa de distância do hotel)
      plain: "text-white",
    },
    size: {
      sm: "size-7 text-[13px]",
      md: "size-10 text-lg",
    },
  },
  defaultVariants: { variant: "gold", size: "md" },
})

function NumberBadge({ className, variant, size, ...props }: React.ComponentProps<"span"> & VariantProps<typeof numberBadgeVariants>) {
  return <span data-slot="number-badge" className={cn(numberBadgeVariants({ variant, size }), className)} {...props} />
}

export { NumberBadge, numberBadgeVariants }
