import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAdjacencyMatrix, MAX_VERTICES, addVertexName } from '@/features/visual-graph-editor/hooks/use-adjacency-list';
import type { AdjacencyMatrix, VertexBaseData } from '@/shared/types/data-structures';

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
      result.current.addVertex('C');
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
      result.current.addVertex('A'); // Add A
    });
    expect(result.current.adjacencyMatrix).toEqual([[0]]);
    expect(result.current.vertices).toEqual([{ id: 0, value: 'A' }]);

    act(() => {
      result.current.addVertex('B'); // Add B
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
      result.current.addVertex('C'); // Add C
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
      result.current.addVertex('C');
    });
    
    // Remove B
    act(() => {
      result.current.removeVertex(1);
    });
    
    // Add a new vertex - should get a new ID (3) with provided name B
    act(() => {
      result.current.addVertex('B');
    });
    
    expect(result.current.vertices).toEqual([
      { id: 0, value: 'A' },
      { id: 2, value: 'C' }, // ID remains 2
      { id: 3, value: 'B' }  // New vertex with ID 3 and name B
    ]);
  });

  it('should handle multiple operations: add, toggle, remove', () => {
    const { result } = renderHook(() => useAdjacencyMatrix(initialMatrix)); // A, B

    // Add C
    act(() => {
      result.current.addVertex('C');
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

  it('should respect MAX_VERTICES limit and disable add', () => {
    // Create a matrix with MAX_VERTICES-1 vertices
    const largeMatrix: AdjacencyMatrix = Array(MAX_VERTICES-1).fill(0).map(() => 
      Array(MAX_VERTICES-1).fill(0)
    );
    
    const { result } = renderHook(() => useAdjacencyMatrix(largeMatrix));
    expect(result.current.disableAdd).toBe(false);
    
    // Add one more vertex to reach the limit
    act(() => {
      result.current.addVertex(addVertexName(MAX_VERTICES-1));
    });
    
    expect(result.current.vertices.length).toBe(MAX_VERTICES);
    expect(result.current.disableAdd).toBe(true);
    
    // Try to add another vertex beyond the limit
    act(() => {
      result.current.addVertex('Z');
    });
    
    // Should still have MAX_VERTICES vertices (no change)
    expect(result.current.vertices.length).toBe(MAX_VERTICES);
  });

  it('should test adding vertices with symbol property', () => {
    const { result } = renderHook(() => useAdjacencyMatrix([]));
    
    // Add vertex with a symbol
    act(() => {
      result.current.addVertex('•');
    });
    
    expect(result.current.vertices).toEqual([
      { id: 0, value: '•' }
    ]);
    
    // Add another vertex with a different symbol
    act(() => {
      result.current.addVertex('★');
    });
    
    expect(result.current.vertices).toEqual([
      { id: 0, value: '•' },
      { id: 1, value: '★' }
    ]);
  });
});

