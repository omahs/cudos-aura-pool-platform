import React from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import '../styles/info-gray-box.css';
import Svg from './Svg';

type Props = {
    text: string
}

export default function InfoGrayBox({ text }: Props) {
    return (
        <div className={'InfoGrayBox FlexRow'}>
            <Svg svg={ErrorOutlineIcon} />
            <div className={'B2'}>{text}</div>
        </div>
    )
}
