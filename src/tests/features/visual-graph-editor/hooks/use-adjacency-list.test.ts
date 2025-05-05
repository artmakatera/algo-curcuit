import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAdjacencyMatrix } from '@/features/visual-graph-editor/hooks/use-adjacency-list';
import type { AdjacencyMatrix } from '@/shared/types/data-structures';

describe('useAdjacencyMatrix Hook Tests', () => {
  let initialMatrix: AdjacencyMatrix;

  beforeEach(() => {
    // Reset initial matrix before each test
    initialMatrix = [
      [0, 1],
      [1, 0],
    ];
  });

  it('should initialize correctly with a given matrix', () => {
    const { result } = renderHook(() => useAdjacencyMatrix(initialMatrix));
    expect(result.current.adjacencyMatrix).toEqual(initialMatrix);
    expect(result.current.verticesNames).toEqual(['A', 'B']);
  });

  it('should initialize correctly with an empty matrix', () => {
    const { result } = renderHook(() => useAdjacencyMatrix([]));
    expect(result.current.adjacencyMatrix).toEqual([]);
    expect(result.current.verticesNames).toEqual([]);
  });

  it('should add a new vertex correctly', () => {
    const { result } = renderHook(() => useAdjacencyMatrix(initialMatrix));

    act(() => {
      result.current.addVertex();
    });

    expect(result.current.adjacencyMatrix).toEqual([
      [0, 1, 0],
      [1, 0, 0],
      [0, 0, 0],
    ]);
    expect(result.current.verticesNames).toEqual(['A', 'B', 'C']);
  });

   it('should add multiple vertices correctly', () => {
    const { result } = renderHook(() => useAdjacencyMatrix([])); // Start empty

    act(() => {
      result.current.addVertex(); // Add A
    });
    expect(result.current.adjacencyMatrix).toEqual([[0]]);
    expect(result.current.verticesNames).toEqual(['A']);

    act(() => {
      result.current.addVertex(); // Add B
    });
    expect(result.current.adjacencyMatrix).toEqual([
      [0, 0],
      [0, 0],
    ]);
    expect(result.current.verticesNames).toEqual(['A', 'B']);

     act(() => {
      result.current.addVertex(); // Add C
    });
    expect(result.current.adjacencyMatrix).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    expect(result.current.verticesNames).toEqual(['A', 'B', 'C']);
  });


  it('should remove a vertex correctly (middle)', () => {
    initialMatrix = [
      [0, 1, 0],
      [1, 0, 1],
      [0, 1, 0],
    ];
    const { result } = renderHook(() => useAdjacencyMatrix(initialMatrix)); // A, B, C

    act(() => {
      result.current.removeVertex(1); // Remove B
    });

    expect(result.current.adjacencyMatrix).toEqual([
      [0, 0], // Row A (originally [0, 1, 0], remove col 1 -> [0, 0])
      [0, 0], // Row C (originally [0, 1, 0], remove col 1 -> [0, 0])
    ]);
    expect(result.current.verticesNames).toEqual(['A', 'C']);
  });

  it('should remove a vertex correctly (first)', () => {
    initialMatrix = [
      [0, 1, 0],
      [1, 0, 1],
      [0, 1, 0],
    ];
    const { result } = renderHook(() => useAdjacencyMatrix(initialMatrix)); // A, B, C

    act(() => {
      result.current.removeVertex(0); // Remove A
    });

    expect(result.current.adjacencyMatrix).toEqual([
      [0, 1], // Row B (originally [1, 0, 1], remove col 0 -> [0, 1])
      [1, 0], // Row C (originally [0, 1, 0], remove col 0 -> [1, 0])
    ]);
    expect(result.current.verticesNames).toEqual(['B', 'C']);
  });

    it('should remove a vertex correctly (last)', () => {
    initialMatrix = [
      [0, 1, 0],
      [1, 0, 1],
      [0, 1, 0],
    ];
    const { result } = renderHook(() => useAdjacencyMatrix(initialMatrix)); // A, B, C

    act(() => {
      result.current.removeVertex(2); // Remove C
    });

    expect(result.current.adjacencyMatrix).toEqual([
      [0, 1], // Row A (originally [0, 1, 0], remove col 2 -> [0, 1])
      [1, 0], // Row B (originally [1, 0, 1], remove col 2 -> [1, 0])
    ]);
    expect(result.current.verticesNames).toEqual(['A', 'B']);
  });

  it('should toggle an edge from 0 to 1', () => {
    const { result } = renderHook(() => useAdjacencyMatrix(initialMatrix)); // Starts with edge 0 -> 1

    act(() => {
      result.current.toggleEdge(0, 1); // Toggle off
    });
    expect(result.current.adjacencyMatrix[0][1]).toBe(0);

    act(() => {
      result.current.toggleEdge(0, 1); // Toggle on
    });
    expect(result.current.adjacencyMatrix[0][1]).toBe(1);
  });

  it('should toggle an edge from 1 to 0', () => {
     const { result } = renderHook(() => useAdjacencyMatrix(initialMatrix)); // Starts with edge 1 -> 0

    act(() => {
      result.current.toggleEdge(1, 0); // Toggle off
    });
    expect(result.current.adjacencyMatrix[1][0]).toBe(0);

    act(() => {
      result.current.toggleEdge(1, 0); // Toggle on
    });
    expect(result.current.adjacencyMatrix[1][0]).toBe(1);
  });

   it('should handle multiple operations: add, toggle, remove', () => {
    const { result } = renderHook(() => useAdjacencyMatrix(initialMatrix)); // A, B

    // Add C
    act(() => {
      result.current.addVertex();
    });
    expect(result.current.verticesNames).toEqual(['A', 'B', 'C']);
    expect(result.current.adjacencyMatrix).toEqual([
      [0, 1, 0],
      [1, 0, 0],
      [0, 0, 0],
    ]);

    // Toggle B -> C edge on
    act(() => {
      result.current.toggleEdge(1, 2);
    });
     expect(result.current.adjacencyMatrix).toEqual([
      [0, 1, 0],
      [1, 0, 1], // Edge B->C added
      [0, 0, 0],
    ]);

    // Remove B (index 1)
    act(() => {
      result.current.removeVertex(1);
    });
    expect(result.current.verticesNames).toEqual(['A', 'C']);
    expect(result.current.adjacencyMatrix).toEqual([
      [0, 0], // Row A (removed col 1)
      [0, 0], // Row C (removed col 1)
    ]);

     // Toggle A -> C edge on
    act(() => {
      result.current.toggleEdge(0, 1); // A is index 0, C is index 1 now
    });
     expect(result.current.adjacencyMatrix).toEqual([
      [0, 1], // Edge A->C added
      [0, 0],
    ]);
  });
});

