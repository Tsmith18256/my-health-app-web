import { OverviewGraph } from "@/features/body-comp/components/overview-page-contents/overview-graph/overview-graph.component";
import { useUserBodyCompEntries } from "@/features/body-comp/state/user-body-comp-entries/user-body-comp-entries.state";
import { TestId } from "@/shared/enums/test-id.enum";
import { formatDateWithoutTime } from "@/shared/utils/dates/format-date-without-time.util";
import { getMockFromFn } from "@/testing/agnostic/getMockFromFn/getMockFromFn.util";
import { render } from "@/testing/react-testing-library/test.util";
import dayjs from "dayjs";
import { expect, it, vi } from "vitest";

vi.mock("@nivo/line");
vi.mock(
  "@/features/body-comp/state/user-body-comp-entries/user-body-comp-entries.state",
);
vi.mock("@/shared/state/user-settings/user-settings.state");

it("renders the overview graph", () => {
  getMockFromFn(useUserBodyCompEntries, {
    deep: true,
    partial: true,
  }).mockReturnValueOnce({
    entries: [
      {
        date: formatDateWithoutTime(dayjs()),
      },
    ],
  });

  const { getByTestId } = render(<OverviewGraph />);

  expect(getByTestId(TestId.OverviewGraph)).toBeInTheDocument();
});

it("doesn't render if there's no data", () => {
  getMockFromFn(useUserBodyCompEntries, {
    deep: true,
    partial: true,
  }).mockReturnValueOnce({
    entries: [],
  });

  const { queryByTestId } = render(<OverviewGraph />);

  expect(queryByTestId(TestId.OverviewGraph)).toBe(null);
});
