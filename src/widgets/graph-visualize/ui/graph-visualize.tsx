"use client";

import { VisualGraph } from "@/features/visual-graph";

import { useAdjacencyMatrix } from "@/features/visual-graph-editor";
import { GraphView } from "./graph-view";
import { useSnapshots } from "@/shared/hooks/use-snapshots";
import { useCallback, useEffect, useMemo, useState } from "react";
import { dfs } from "../model/dfs/dfs";
import { bfs } from "../model/bfs/bfs"; // Import BFS function
import { defaultSnapshots } from "../model/create-step-snapshot";
import { AdjacencyMatrix } from "@/shared/types/data-structures";
import { createStepSnapshot as createStepSnapshotThunk } from "../model/create-step-snapshot";
import { languagesMapSettings as dfsLanguagesMapSettings } from "../model/dfs/languages-map-settings";
import { languagesMapSettings as bfsLanguagesMapSettings } from "../model/bfs/languages-map-settings"; // Import BFS language settings
import { LANGUAGES, Mode, MODES } from "../model/constants";
import { StepSnapshotPayload } from "../model/types";

import { useCodeLang } from "@/shared/contexts/code-lang";
import TypographyH3 from "@/components/ui/typography/typographyH3";
import { CodeViewers } from "@/components/ui/code-viewers";
import { ToggleMenu } from "@/components/ui/toggle-menu";
import { Controls } from "./controls";

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
    isUndirected,
    setIsUndirected,
    isLoop,
    setIsLoop,
  } = useAdjacencyMatrix(matrix);

  const genCall = useMemo(() => {
    if (mode === "bfs") {
      return bfs as unknown as () => Generator<
        StepSnapshotPayload,
        void,
        unknown
      >;
    }
    return dfs as unknown as () => Generator<
      StepSnapshotPayload,
      void,
      unknown
    >;
  }, [mode]);

  // Select language settings based on the current mode
  const currentLanguageSettings = useMemo(() => {
    return mode === "bfs" ? bfsLanguagesMapSettings : dfsLanguagesMapSettings;
  }, [mode]);

  const createStepSnapshot = useMemo(
    () =>
      createStepSnapshotThunk(currentLanguageSettings, LANGUAGES.javascript),
    [currentLanguageSettings, createStepSnapshotThunk]
  );

  const {
    currentSnapshot,
    hasPrevSnapshot,
    hasNextSnapshot,
    handlePreviousStep,
    handleNextStep,
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
    if (mode === "edit") {
      clearSnapshots();
    } else {
      reset();
    }
  }, [adjacencyMatrix, startFrom, mode]);

  return (
    <div className="flex flex-col px-2 sm:px-24 py-10">
      <ToggleMenu
        menuItems={MODES}
        value={mode}
        onValueChange={(value) => {
          setMode(value as Mode);
        }}
      />

      <Controls
        isEditMode={mode === "edit"}
        startFrom={startFrom}
        setStartFrom={setStartFrom}
        vertices={vertices}
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
        isLoop={isLoop}
        setIsLoop={setIsLoop}
        isUndirected={isUndirected}
        setIsUndirected={setIsUndirected}
      />

      <VisualGraph
        key="visual-graph"
        adjacencyMatrix={adjacencyMatrix}
        vertices={vertices}
        sourceHighlightedNode={currentSnapshot?.fromIndexToCheck}
        highlightedNode={currentSnapshot?.checkingIndex}
        awaitingNodes={
          mode === "bfs" ? currentSnapshot?.queue : currentSnapshot?.stack
        }
        resultNodes={currentSnapshot?.result}
        isUndirected={isUndirected}
        isLoop={isLoop}
      />

      {mode === "edit" && (
        <GraphView
          adjacencyMatrix={adjacencyMatrix}
          disableAdd={disableAdd}
          onToggle={toggleEdge}
          onAdd={addVertex}
          vertices={vertices}
          onRemove={removeVertex}
          disableLoop={!isLoop}
        />
      )}

      {(mode === "dfs" || mode === "bfs") && (
        <div className="mt-12 self-center">
          <TypographyH3 className="mb-3 font-bold">Code:</TypographyH3>
          <CodeViewers
            langMap={currentLanguageSettings}
            language={codeLang}
            onLanguageChange={(lang: string) => setCodeLang(lang)}
            step={currentSnapshot.type}
          />
        </div>
      )}
    </div>
  );
};
