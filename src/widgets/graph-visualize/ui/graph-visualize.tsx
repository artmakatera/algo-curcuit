"use client";

import { VisualGraph } from "@/features/visual-graph";

import { useAdjacencyMatrix } from "@/features/visual-graph-editor";
import { GraphView } from "./graph-view";
import { useSnapshots } from "@/shared/hooks/use-snapshots";
import { useCallback, useEffect, useMemo, useState } from "react";
import { dfs } from "../model/dfs/dfs";
import { defaultSnapshots } from "../model/create-step-snapshot";
import { AdjacencyMatrix } from "@/shared/types/data-structures";
import { createStepSnapshot as createStepSnapshotThunk } from "../model/create-step-snapshot";
import { languagesMapSettings } from "../model/dfs/languages-map-settings";
import { LANGUAGES } from "../model/constants";
import { StepSnapshotPayload } from "../model/types";

import { VisualizeControls } from "@/features/visualizer-player-controls";
import StartFromSelect from "./start-from-select";
import { useCodeLang } from "@/shared/contexts/code-lang";
import TypographyH3 from "@/components/ui/typography/typographyH3";
import { CodeViewers } from "@/components/ui/code-viewers";

const matrix = [
  [0, 1, 0, 0, 0, 0],
  [0, 0, 1, 1, 0, 0],
  [0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0],
];

export const GraphVisualize = () => {
  const [startFrom, setStartFrom] = useState<number>(0);
  const [codeLang, setCodeLang] = useCodeLang();

  const {
    adjacencyMatrix,
    vertices,
    addVertex,
    toggleEdge,
    removeVertex,
    disableAdd,
  } = useAdjacencyMatrix(matrix);

  const genCall = useMemo(() => {
    // if (activeType === ActionType.bfs) {
    //   return tree.bfs as unknown as () => Generator<
    //     GenValuePayload,
    //     void,
    //     unknown
    //   >;
    // }
    return dfs as unknown as () => Generator<
      StepSnapshotPayload,
      void,
      unknown
    >;
  }, []);

  const createStepSnapshot = useMemo(
    () => createStepSnapshotThunk(languagesMapSettings, LANGUAGES.javascript),
    [languagesMapSettings, createStepSnapshotThunk]
  );

  const {
    currentSnapshot,
    stepsSnapshot,
    hasPrevSnapshot,
    hasNextSnapshot,
    handlePreviousStep,
    handleNextStep,
    goToLastStep,
    rebuildSnapshots: reset,
    visualize,
    isPlaying,
    onChangeSpeed,
    delayRef,
    clearSnapshots,
  } = useSnapshots<
    (typeof defaultSnapshots)[number],
    StepSnapshotPayload,
    [AdjacencyMatrix, number]
  >({
    defaultDelay: "750",
    defaultSnapshots: defaultSnapshots,
    genCall,
    genCallArgs: [adjacencyMatrix, startFrom],
    createStepSnapshot,
  });

  const handlePlay = useCallback(async () => {
    visualize();
  }, [visualize]);

  useEffect(() => {
    reset();
  }, [adjacencyMatrix, startFrom]);

  return (
    <div className="flex flex-col sm:px-24 py-10">
      <VisualGraph
        adjacencyMatrix={adjacencyMatrix}
        vertices={vertices}
        sourceHighlightedNode={currentSnapshot?.fromIndexToCheck}
        highlightedNode={currentSnapshot?.checkingIndex}
        awaitingNodes={currentSnapshot?.stack}
        resultNodes={currentSnapshot?.result}
      />
      <div className="mb-12 flex gap-4 mx-auto max-w-xl items-end">
        <StartFromSelect
          value={startFrom}
          onChange={(value) => setStartFrom(+value)}
          vertices={vertices}
        />

        <VisualizeControls
          onPlay={handlePlay}
          onReset={reset}
          onPreviousStep={handlePreviousStep}
          onNextStep={handleNextStep}
          isPlaying={isPlaying}
          isResetDisabled={isPlaying}
          isPreviousStepDisabled={!hasPrevSnapshot}
          isNextStepDisabled={!hasNextSnapshot}
          speed={delayRef.current}
          onChangeSpeed={onChangeSpeed}
        />
      </div>

      <GraphView
        adjacencyMatrix={adjacencyMatrix}
        disableAdd={disableAdd}
        onToggle={toggleEdge}
        onAdd={addVertex}
        vertices={vertices}
        onRemove={removeVertex}
      />
      <div className="mt-12">
        <TypographyH3 className="mb-3 font-bold">Code:</TypographyH3>
        <CodeViewers
          langMap={languagesMapSettings}
          language={codeLang}
          onLanguageChange={(lang: string) => setCodeLang(lang)}
          step={currentSnapshot.type}
        />
      </div>
    </div>
  );
};
