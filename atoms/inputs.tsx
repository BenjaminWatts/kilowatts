import React from 'react'
import {SearchBar} from '@rneui/themed'
import log from '../services/log'


type SearchUnitGroupsProps = {
    value: string
    onChangeText: (text: string) => void
}
/*
A search input with a button
*/
export const SearchUnitGroups:React.FC<SearchUnitGroupsProps> = ({
    value, onChangeText
}) => {
    log.debug(`SearchUnitGroups ${value}`)
    return (
        <SearchBar
            style={{margin: 0}}
            placeholder='Search'
            value={value}
            onChangeText={onChangeText}
        />
    )
}