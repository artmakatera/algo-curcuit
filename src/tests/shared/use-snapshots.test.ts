import { expect, it, describe } from 'vitest'
import { renderHook, act } from '@testing-library/react';
import { useSnapshots, useGeneratorCall } from '@/shared/hooks/use-snapshots';

// Mock snapshot type
interface MockSnapshot {
  id: number;
  value: number;
  type: 'step' | 'goBack';
}

// Mock generator function
function* mockGenerator(initialValue: number, steps: number) {
  let value = initialValue;
  for (let i = 0; i < steps; i++) {
    yield { value: value++, type: 'step' as const };
  }
}

// Mock createStepSnapshot function
const createStepSnapshot = (payload: { value: number; type: 'step' }): MockSnapshot => ({
  id: payload.value,
  value: payload.value,
  type: 'step',
});




describe('useGeneratorCall', () => {
  it('should return a function', () => {
    const { result } = renderHook(() =>
      useGeneratorCall<MockSnapshot, { value: number; type: 'step' }, [number, number]>({
        genCall: mockGenerator,
        createStepSnapshot,
      }),
    );
    expect(typeof result.current).toBe('function');
  });

  it('should generate snapshots from the generator', () => {
    const { result } = renderHook(() =>
      useGeneratorCall<MockSnapshot, { value: number; type: 'step' }, [number, number]>({
        genCall: mockGenerator,
        createStepSnapshot,
      }),
    );
    const getSnapshots = result.current;

    const snapshots = getSnapshots(10, 3);
    expect(snapshots).toEqual([
      { id: 10, value: 10, type: 'step' },
      { id: 11, value: 11, type: 'step' },
      { id: 12, value: 12, type: 'step' },
    ]);
  });

  it('should handle an empty generator', () => {
    const { result } = renderHook(() =>
      useGeneratorCall<MockSnapshot, { value: number; type: 'step' }, [number, number]>({
        genCall: mockGenerator,
        createStepSnapshot,
      }),
    );
    const getSnapshots = result.current;
    const snapshots = getSnapshots(10, 0);
    expect(snapshots).toBeUndefined();
  });
});


describe('useSnapshots', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() =>
      useSnapshots<MockSnapshot, { value: number; type: 'step' }, [number, number]>({
        genCall: mockGenerator,
        createStepSnapshot,
        genCallArgs: [0, 0],
      }),
    );
    const {
      stepsSnapshot,
      snapshotIndex,
      isPlaying,
      hasPrevSnapshot,
      hasNextSnapshot,
    } = result.current;

    expect(stepsSnapshot).toEqual([]);
    expect(snapshotIndex).toBe(0);
    expect(isPlaying).toBe(false);
    expect(hasPrevSnapshot).toBe(false);
    expect(hasNextSnapshot).toBe(false);
  });

  it('should generate snapshots on mount', () => {
    const { result } = renderHook(() =>
      useSnapshots<MockSnapshot, { value: number; type: 'step' }, [number, number]>({
        genCall: mockGenerator,
        createStepSnapshot,
        genCallArgs: [1, 3],
      }),
    );
    const { stepsSnapshot } = result.current;
    expect(stepsSnapshot).toEqual([
      { id: 1, value: 1, type: 'step' },
      { id: 2, value: 2, type: 'step' },
      { id: 3, value: 3, type: 'step' },
    ]);
  });

  it('should update snapshots when genCallArgs change', () => {
    let { result, rerender } = renderHook(
      (args: [number, number]) =>
        useSnapshots<MockSnapshot, { value: number; type: 'step' }, [number, number]>({
          genCall: mockGenerator,
          createStepSnapshot,
          genCallArgs: args,
        }),
      {
        initialProps: [1, 3] as [number, number],
      },
    );

    expect(result.current.stepsSnapshot).toEqual([
      { id: 1, value: 1, type: 'step' },
      { id: 2, value: 2, type: 'step' },
      { id: 3, value: 3, type: 'step' },
    ]);

    rerender([10, 2]);
    act(() => result.current.rebuildSnapshots());

    expect(result.current.stepsSnapshot).toEqual([
      { id: 10, value: 10, type: 'step' },
      { id: 11, value: 11, type: 'step' },
    ]);
  });

  it('should handle previous and next steps', () => {
    const { result } = renderHook(() =>
      useSnapshots<MockSnapshot, { value: number; type: 'step' }, [number, number]>({
        genCall: mockGenerator,
        createStepSnapshot,
        genCallArgs: [1, 3],
      }),
    );

    const { handleNextStep, handlePreviousStep, snapshotIndex } = result.current;

    expect(snapshotIndex).toBe(0);

    act(() => handleNextStep());
    expect(result.current.snapshotIndex).toBe(1);

    act(() => handleNextStep());
    expect(result.current.snapshotIndex).toBe(2);

    act(() => handlePreviousStep());
    expect(result.current.snapshotIndex).toBe(1);

    act(() => handlePreviousStep());
    expect(result.current.snapshotIndex).toBe(0);
  });

  it('should handle isGoBack with handlePreviousStep', () => {
    const { result } = renderHook(() =>
      useSnapshots<MockSnapshot, { value: number; type: 'step' }, [number, number]>({
        genCall: mockGenerator,
        createStepSnapshot,
        genCallArgs: [1, 3],
      }),
    );

    const { handlePreviousStep, isGoBack } = result.current;

    expect(isGoBack).toBe(false);
    act(() => handlePreviousStep());
    expect(result.current.isGoBack).toBe(true);
  });

  it('should handle getGoBackSnapshot', () => {
    const { result } = renderHook(() =>
      useSnapshots<MockSnapshot, { value: number; type: 'step' }, [number, number]>({
        genCall: mockGenerator,
        createStepSnapshot,
        genCallArgs: [1, 3],
      }),
    );

    const { handlePreviousStep, goToLastStep } = result.current;

    act(() => goToLastStep());
    act(() => handlePreviousStep());

    const { currentSnapshot, stepsSnapshot } = result.current;

    expect(currentSnapshot).toEqual({ id: 2, value: 2, type: "step", });
  });


  it('should update delay when onChangeSpeed is called', () => {
    const { result } = renderHook(() =>
      useSnapshots<MockSnapshot, { value: number; type: 'step' }, [number, number]>({
        genCall: mockGenerator,
        createStepSnapshot,
        genCallArgs: [1, 3],
        defaultDelay: "750"
      }),
    );

    const { onChangeSpeed, delayRef } = result.current;

    act(() => {
      onChangeSpeed('100');
    });
    expect(delayRef.current).toBe("100");
  });

  it('should reset snapshot index when rebuildSnapshots is called', () => {
    const { result } = renderHook(() =>
      useSnapshots<MockSnapshot, { value: number; type: 'step' }, [number, number]>({
        genCall: mockGenerator,
        createStepSnapshot,
        genCallArgs: [1, 3],
      }),
    );

    const { handleNextStep, rebuildSnapshots } = result.current;

    act(() => {
      handleNextStep();
    });

    const { snapshotIndex } = result.current;
    expect(snapshotIndex).toBe(1);

    act(() => {
      rebuildSnapshots();
    });
    expect(result.current.snapshotIndex).toBe(0);
  });

  it('should clear snapshots when clearSnapshots is called', () => {
    const { result } = renderHook(() =>
      useSnapshots<MockSnapshot, { value: number; type: 'step' }, [number, number]>({
        genCall: mockGenerator,
        createStepSnapshot,
        genCallArgs: [1, 3],
      }),
    );

    const { clearSnapshots } = result.current;

    act(() => {
      clearSnapshots();
    });

    const { stepsSnapshot } = result.current;
    expect(stepsSnapshot).toEqual([]);
  });

  it('should go to last step when goToLastStep is called', () => {
    const { result } = renderHook(() =>
      useSnapshots<MockSnapshot, { value: number; type: 'step' }, [number, number]>({
        genCall: mockGenerator,
        createStepSnapshot,
        genCallArgs: [1, 5],
      }),
    );


    const { goToLastStep, stepsSnapshot } = result.current;
    console.log(stepsSnapshot)

    act(() => {
      goToLastStep();
    });
    const { snapshotIndex } = result.current;

    expect(snapshotIndex).toBe(stepsSnapshot.length - 1);
  });

  it('should handle play and pause when handlePlay is called', async () => {
    const { result } = renderHook(() =>
      useSnapshots<MockSnapshot, { value: number; type: 'step' }, [number, number]>({
        genCall: mockGenerator,
        createStepSnapshot,
        genCallArgs: [1, 3],
      }),
    );

    const { visualize } = result.current;


    await visualize();
    expect(result.current.snapshotIndex).toBe(result.current.stepsSnapshot.length - 1);
  }
  );
});
