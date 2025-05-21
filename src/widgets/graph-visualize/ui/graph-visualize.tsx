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
import { LANGUAGES, Mode, MODES } from "../model/constants";
import { StepSnapshotPayload } from "../model/types";

import { VisualizeControls } from "@/features/visualizer-player-controls";
import StartFromSelect from "./start-from-select";
import { useCodeLang } from "@/shared/contexts/code-lang";
import TypographyH3 from "@/components/ui/typography/typographyH3";
import { CodeViewers } from "@/components/ui/code-viewers";
import { ToggleMenu } from "@/components/ui/toggle-menu";

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
  const [mode, setMode] = useState<Mode>("edit");

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
    <div className="flex flex-col px-2 sm:px-24 py-10">
      <ToggleMenu
        menuItems={MODES}
        value={mode}
        onValueChange={(value) => {
          setMode(value as Mode);
          clearSnapshots();
        }}
      />

        {mode === "dfs" && (
        <div className="m-6 flex flex-wrap gap-4 mx-auto max-w-xl items-end justify-center">
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
      )}
      
      <VisualGraph
        key="visual-graph"
        adjacencyMatrix={adjacencyMatrix}
        vertices={vertices}
        sourceHighlightedNode={currentSnapshot?.fromIndexToCheck}
        highlightedNode={currentSnapshot?.checkingIndex}
        awaitingNodes={currentSnapshot?.stack}
        resultNodes={currentSnapshot?.result}
      />

     {mode === "edit" && <GraphView
        adjacencyMatrix={adjacencyMatrix}
        disableAdd={disableAdd}
        onToggle={toggleEdge}
        onAdd={addVertex}
        vertices={vertices}
        onRemove={removeVertex}
      />}
    
      {mode === "dfs" && <div className="mt-12 self-center">
        <TypographyH3 className="mb-3 font-bold">Code:</TypographyH3>
        <CodeViewers
          langMap={languagesMapSettings}
          language={codeLang}
          onLanguageChange={(lang: string) => setCodeLang(lang)}
          step={currentSnapshot.type}
        />
      </div>}
    </div>
  );
};
