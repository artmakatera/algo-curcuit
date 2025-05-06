import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAdjacencyMatrix } from '@/features/visual-graph-editor/hooks/use-adjacency-list';
import type { AdjacencyMatrix } from '@/shared/types/data-structures';

// Interface to match the one in use-adjacency-list.ts
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
    
    // Test the vertices array contains objects with correct id and value
    expect(result.current.vertices).toEqual([
      { id: 0, value: 'A' },
      { id: 1, value: 'B' }
    ]);
  });

  it('should initialize correctly with an empty matrix', () => {
    const { result } = renderHook(() => useAdjacencyMatrix([]));
    expect(result.current.adjacencyMatrix).toEqual([]);
    expect(result.current.vertices).toEqual([]);
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
    
    // Verify the vertices array with unique IDs
    expect(result.current.vertices).toEqual([
      { id: 0, value: 'A' },
      { id: 1, value: 'B' },
      { id: 2, value: 'C' }
    ]);
  });

  it('should add multiple vertices correctly', () => {
    const { result } = renderHook(() => useAdjacencyMatrix([])); // Start empty

    act(() => {
      result.current.addVertex(); // Add A
    });
    expect(result.current.adjacencyMatrix).toEqual([[0]]);
    expect(result.current.vertices).toEqual([{ id: 0, value: 'A' }]);

    act(() => {
      result.current.addVertex(); // Add B
    });
    expect(result.current.adjacencyMatrix).toEqual([
      [0, 0],
      [0, 0],
    ]);
    expect(result.current.vertices).toEqual([
      { id: 0, value: 'A' },
      { id: 1, value: 'B' }
    ]);

    act(() => {
      result.current.addVertex(); // Add C
    });
    expect(result.current.adjacencyMatrix).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    expect(result.current.vertices).toEqual([
      { id: 0, value: 'A' },
      { id: 1, value: 'B' },
      { id: 2, value: 'C' }
    ]);
  });

  it('should remove a vertex correctly (middle) and preserve IDs', () => {
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
    
    // Verify that IDs remain consistent - A should still be 0 and C should still be 2
    expect(result.current.vertices).toEqual([
      { id: 0, value: 'A' },
      { id: 2, value: 'C' } // Note: ID is still 2 because we're preserving IDs
    ]);
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
    expect(result.current.vertices).toEqual([
      { id: 1, value: 'B' },
      { id: 2, value: 'C' }
    ]);
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
    expect(result.current.vertices).toEqual([
      { id: 0, value: 'A' },
      { id: 1, value: 'B' }
    ]);
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

  it('should verify unique IDs are maintained when reusing letters', () => {
    // Start with A, B
    const { result } = renderHook(() => useAdjacencyMatrix(initialMatrix));
    
    // Add C
    act(() => {
      result.current.addVertex();
    });
    
    // Remove B
    act(() => {
      result.current.removeVertex(1);
    });
    
    // Add a new vertex - should reuse letter B but get a new ID (3)
    act(() => {
      result.current.addVertex();
    });
    
    expect(result.current.vertices).toEqual([
      { id: 0, value: 'A' },
      { id: 2, value: 'C' }, // ID remains 2
      { id: 3, value: 'B' }  // New vertex with ID 3 but reuses letter B
    ]);
  });

  it('should handle multiple operations: add, toggle, remove', () => {
    const { result } = renderHook(() => useAdjacencyMatrix(initialMatrix)); // A, B

    // Add C
    act(() => {
      result.current.addVertex();
    });
    expect(result.current.vertices).toEqual([
      { id: 0, value: 'A' },
      { id: 1, value: 'B' },
      { id: 2, value: 'C' }
    ]);
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
    expect(result.current.vertices).toEqual([
      { id: 0, value: 'A' },
      { id: 2, value: 'C' } // ID is preserved
    ]);
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

