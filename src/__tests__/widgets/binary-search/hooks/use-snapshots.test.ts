import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import { useSnapshots } from '@/widgets/binary-search-visualize/hooks/use-snapshots';
import { STEPS } from '@/widgets/binary-search-visualize';
import React from 'react';




describe('useSnapshots', () => {
  test('It should return snapshots', () => {
    const { result } = renderHook(() => {

      const { setStepSnapshots, setSnapshotIndex, stepsSnapshot, snapshotIndex } = useSnapshots();

      React.useEffect(() => {
        setStepSnapshots(
          [{
            type: STEPS.notFound,
            compareIndexes: [-1, -1],
            checkIndex: -1,
            result: -1,
            highlightLines: [],
          }],
        );
        setSnapshotIndex(1)
      }, [setStepSnapshots, setSnapshotIndex]);


      return [stepsSnapshot, snapshotIndex]


    });

    const [stepsSnapshot, snapshotIndex] = result.current;

    expect(stepsSnapshot).toHaveLength(1);
    expect(snapshotIndex).toBe(1);
  });

  test('It should clear snapshots on clearSnapshots', () => {
    const { result } = renderHook(() => {

      const { setStepSnapshots, setSnapshotIndex, stepsSnapshot, snapshotIndex, clearSnapshots } = useSnapshots();

      React.useEffect(() => {
        setStepSnapshots(
          [{
            type: STEPS.notFound,
            compareIndexes: [-1, -1],
            checkIndex: -1,
            result: -1,
            highlightLines: [],
          }],
        );
        setSnapshotIndex(1)
        clearSnapshots()
      }, [setStepSnapshots, setSnapshotIndex, clearSnapshots]);


      return [stepsSnapshot, snapshotIndex]


    });

    const [stepsSnapshot, snapshotIndex] = result.current;

    expect(stepsSnapshot).toHaveLength(0);
    expect(snapshotIndex).toBe(-1);
  });

  test('It should go to the prev step', () => {
    const { result } = renderHook(() => {

      const { setSnapshotIndex, snapshotIndex, handlePreviousStep } = useSnapshots();

      React.useEffect(() => {

        setSnapshotIndex(2)
        handlePreviousStep()
      }, [setSnapshotIndex, handlePreviousStep]);


      return snapshotIndex


    });

    const snapshotIndex = result.current;

    expect(snapshotIndex).toBe(1);
  });
  test('It should go to the next step', () => {
    const { result } = renderHook(() => {

      const { setSnapshotIndex, snapshotIndex, handleNextStep } = useSnapshots();

      React.useEffect(() => {

        setSnapshotIndex(2)
        handleNextStep()
      }, [setSnapshotIndex, handleNextStep]);


      return snapshotIndex


    });

    const snapshotIndex = result.current;

    expect(snapshotIndex).toBe(3);
  });

  test('it should update delay ref', () => {
    const { result } = renderHook(() => {

      const { delayRef, onChangeSpeed } = useSnapshots();

      React.useEffect(() => {

        onChangeSpeed("100")
      }, [onChangeSpeed]);

      return delayRef

    });

    const delay = result.current.current;

    expect(delay).toBe("100");

  });

  test('it should visualize should stop on ref stop', async () => {
    const snapshots = [
      {
        "type": 0,
        "compareIndexes": [
          0,
          20
        ],
        "checkIndex": -1,
        "highlightLines": [
          2,
          3
        ]
      },
      {
        "type": 1,
        "compareIndexes": [
          0,
          20
        ],
        "checkIndex": 10,
        "highlightLines": [
          5,
          17,
          6
        ]
      },
      {
        "type": 2,
        "compareIndexes": [
          0,
          20
        ],
        "checkIndex": 10,
        "highlightLines": [
          5,
          17,
          12,
          13,
          14
        ]
      },
      {
        "type": 1,
        "compareIndexes": [
          11,
          20
        ],
        "checkIndex": 15,
        "highlightLines": [
          5,
          17,
          6
        ]
      },
      {
        "type": 3,
        "compareIndexes": [
          11,
          20
        ],
        "checkIndex": 15,
        "highlightLines": [
          5,
          17,
          14,
          15,
          16
        ]
      },
      {
        "type": 1,
        "compareIndexes": [
          11,
          14
        ],
        "checkIndex": 12,
        "highlightLines": [
          5,
          17,
          6
        ]
      },
      {
        "type": 3,
        "compareIndexes": [
          11,
          14
        ],
        "checkIndex": 12,
        "highlightLines": [
          5,
          17,
          14,
          15,
          16
        ]
      },
      {
        "type": 1,
        "compareIndexes": [
          11,
          11
        ],
        "checkIndex": 11,
        "highlightLines": [
          5,
          17,
          6
        ]
      },
      {
        "type": 4,
        "result": 11,
        "compareIndexes": [
          -1,
          -1
        ],
        "checkIndex": -1,
        "highlightLines": [
          8,
          9,
          10
        ]
      }
    ]
    const { result } = renderHook(() => {

      const { visualize, startedRef, snapshotIndex, stepsSnapshot } = useSnapshots({ defaultSnapshot: snapshots, defaultDelay: "0" });

      React.useEffect(() => {


        const start = async () => {

          visualize()
          Promise.resolve().then(() => {
            startedRef.current = false
          })

        }
        start()
      }, [visualize, startedRef]);

      return { snapshotIndex, stepsSnapshot }

    });

    await waitFor(() => expect(result.current.snapshotIndex).not.toBe(8))
  })

});