"use client";

import { VisualGraph } from "@/features/visual-graph";

import { useAdjacencyMatrix } from "@/features/visual-graph-editor/hooks/use-adjacency-list";
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
import { Controls } from "./controls";
import { VisualizeControls } from "@/features/visualizer-player-controls";
import { EditButton } from "@/features/edit-button";
import { TargetInput } from "@/components/ui/target-input";

const matrix = [
  [0, 1, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 1, 0, 0],
];

export const GraphVisualize = () => {
  const [startFrom, setStartFrom] = useState<number>(0);

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
    genCallArgs: [adjacencyMatrix, 0],
    createStepSnapshot,
  });

  const handlePlay = useCallback(async () => {
    visualize();
  }, [visualize]);

  useEffect(() => {
    reset();
  }, [adjacencyMatrix]);

  return (
    <div className="flex flex-col sm:px-24 py-10">
      {JSON.stringify(currentSnapshot, null, 2)}

      <div className="mb-12 flex gap-4 mx-auto max-w-xl items-end">
        <TargetInput
          value={startFrom}
          onChange={(value) => setStartFrom(+value)}
          label="Start from:"
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
      <VisualGraph adjacencyMatrix={adjacencyMatrix} vertices={vertices} />
      <GraphView
        adjacencyMatrix={adjacencyMatrix}
        disableAdd={disableAdd}
        onToggle={toggleEdge}
        onAdd={addVertex}
        vertices={vertices}
        onRemove={removeVertex}
      />
      {/* <AdjacencyMatrixTable
        adjacencyMatrix={adjacencyMatrix}
        disableAdd={disableAdd}
        onToggle={toggleEdge}
        onAdd={addVertex}
        vertices={vertices}
        onRemove={removeVertex}
      /> */}
    </div>
  );
};
