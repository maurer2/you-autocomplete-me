import type { ResultsTableProps } from './types';

export default function ResultsTable({ data, caption }: ResultsTableProps) {
  return (
    <table>
      <caption><h2>{caption}</h2></caption>
      <thead>
        <tr>
          <th colSpan={data.length}>Data</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {data.map((cell) =><td key={cell}>{cell}</td>)}
        </tr>
      </tbody>
    </table>
  );
}
