import { TypographyH1 } from "@/components/ui/typography";
import { AlgorithmComplexities } from "@/features/algorithm-complexity";
import { COMPLEXITIES } from "@/shared/constants/complexities";
import { TwoPointersVisualize } from "@/widgets/two-pointers-visualize/ui/two-pointers-visualize";



export  function TwoPointersPage() {

  return (
        <main className="flex flex-col px-4 sm:px-24 py-10">
          <TypographyH1 className="w-max text-center m-auto">
            Two Pointers Patterns
          </TypographyH1>
             <div className="flex justify-center items-center">
                  <AlgorithmComplexities
                    spaceComplexity={COMPLEXITIES.O_1}
                    timeComplexity={COMPLEXITIES.O_N}
                  />
                </div>
          <TwoPointersVisualize />
        </main>
  )
}