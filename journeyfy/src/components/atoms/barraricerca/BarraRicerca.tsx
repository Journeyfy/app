import React, { useState } from 'react';
import { Select, Option, Autocomplete } from 'dolfo';
import { useNavigate } from 'react-router-dom';

interface BarraRicercaProps {
  onSearch: (searchTerm: string) => Promise<OptionProps[]>;
}

export interface OptionProps{
    readonly id: string
    readonly name: string
}

export class BarraRicerca extends Autocomplete<OptionProps, string, BarraRicercaProps>{
  getSource = this.props.onSearch

getDescription = (item: OptionProps) => item.name

getKey = (item: OptionProps) => item.id
}