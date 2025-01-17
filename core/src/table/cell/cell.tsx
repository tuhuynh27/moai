import { background } from "../../background/background";
import { border } from "../../border/border";
import { TableColumn, TableProps, TableState } from "../table";
import { TableCellExpand } from "./expand/expand";

export const tableTdCls = [border.weak, background.strong].join(" ");

interface Props<R> {
	table: TableProps<R>;
	state: TableState;
	row: R;
	column: TableColumn<R>;
	index: number;
}

export const TableCell = <R,>(props: Props<R>): JSX.Element => {
	const { table, state, row, column, index } = props;
	const rowKey = table.rowKey(row);
	const body =
		typeof column.render === "function"
			? column.render(row) // Render function
			: row[column.render]; // Accessor
	const children = (() => {
		if (index !== 0) return body;
		if (table.expandRowRender === undefined) return body;
		return <TableCellExpand {...{ state, rowKey }} children={body} />;
	})();
	const className = [
		border.weak,
		state.expanded.has(rowKey) ? background.weak : background.strong,
		column.className,
	].join(" ");
	return <td className={className} children={children} />;
};
