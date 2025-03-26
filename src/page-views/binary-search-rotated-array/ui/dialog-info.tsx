import { TypographyList, TypographyP } from "@/components/ui/typography";

export const DialogInfo = () => {
  return (
    <div>
      <TypographyP>
        Binary search is an efficient algorithm for finding a target value
        within a sorted array. However, a rotated sorted array is a sorted array
        that has been "rotated" by some number of positions. For example, [4, 5,
        6, 7, 0, 1, 2] is a rotated sorted array. The challenge is to find the
        target in this modified array efficiently.
      </TypographyP>
      <TypographyP>
        <strong>In essence:</strong> Binary search can be adapted to find a
        target value in a rotated sorted array by adjusting how the search
        interval is divided. The key idea is to check which half of the array is
        still sorted.
      </TypographyP>
      <TypographyP>Here's how it works:</TypographyP>
      <TypographyList>
        <li>
          <strong>Find the Pivot: </strong>
          <TypographyList>
            Compare the middle element to the target.
          </TypographyList>
          <TypographyList>
            If they match, the search is complete.
          </TypographyList>
          <TypographyList>
            Otherwise, determine which half of the array (left or right) is
            sorted.
          </TypographyList>
          <TypographyList>
            If the target is within the sorted half, continue the search in that
            half.
          </TypographyList>
          <TypographyList>
            f the target is not in the sorted half, search the other half.
          </TypographyList>
        </li>
        <li>
          <strong>Repeat</strong>Continue this process of elimination until the
          target is found or the search interval is empty.
        </li>
      </TypographyList>
      <TypographyP>Pros:</TypographyP>
      <TypographyList>
        <li>
          <strong>Efficient for Large Datasets:</strong> Efficient for Large
          Datasets
        </li>
        <li>
          <strong>Handles Rotated Arrays:</strong> Extends binary search to work with rotated sorted arrays.
        </li>
      </TypographyList>
      <TypographyP>Cons:</TypographyP>
      <TypographyList>
        <li>
          <strong>More Complex Implementation: </strong> More complex to implement than standard binary search.
        </li>
        
      </TypographyList>
    </div>
  );
};
