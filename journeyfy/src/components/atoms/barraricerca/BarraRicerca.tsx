import { Autocomplete } from "dolfo";

interface BarraRicercaProps {
  onSearch: (searchTerm: string) => Promise<OptionProps[]>;
}

export interface OptionProps {
  readonly id: number;
  readonly name: string;
}

export class BarraRicerca extends Autocomplete<
  OptionProps,
  number,
  BarraRicercaProps
> {
  getSource = this.props.onSearch;
  getDescription = (item: OptionProps) => item.name;
  getKey = (item: OptionProps) => item.id;
}
