import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import AppRoutes from '../../../app-routes/entities/AppRoutes';

import AlertStore from '../../../../core/presentation/stores/AlertStore';
import AppStore from '../../../../core/presentation/stores/AppStore';
import TableStore from '../../../../core/presentation/stores/TableStore';
import TableRow from '../../../../core/entities/TableRow';

import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';

import Actions, { ACTIONS_HEIGHT, ACTIONS_LAYOUT } from '../../../../core/presentation/components/Actions';
import Svg, { SvgSize } from '../../../../core/presentation/components/Svg';
import Button, { BUTTON_COLOR, BUTTON_PADDING, BUTTON_RADIUS, BUTTON_TYPE } from '../../../../core/presentation/components/Button';
import Input from '../../../../core/presentation/components/Input';
import Select from '../../../../core/presentation/components/Select';
import { MenuItem } from '@mui/material'
import Tooltip from '../../../../core/presentation/components/Tooltip';
import TextWithTooltip from '../../../../core/presentation/components/TextWithTooltip';
import LoadingIndicator from '../../../../core/presentation/components/LoadingIndicator';
import Popover from '../../../../core/presentation/components/Popover';
import UploaderComponent from '../../../../core/presentation/components/UploaderComponent';
import Table, { createTableCellString, createTableRow } from '../../../../core/presentation/components/Table';

import SvgLogo from '../vectors/info.svg';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import '../styles/ui-kit-page.css';
import ExampleModal from './ExampleModal';
import ExampleModalStore from '../stores/ExampleModalStore';

type Props = {
    appStore?: AppStore
    alertStore?: AlertStore;
    exampleModalStore?: ExampleModalStore;
}

function UiKitPage({ appStore, alertStore, exampleModalStore }: Props) {
    const navigate = useNavigate();
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [popoverAnchor, setPopupAnchor] = useState(null);

    function onClickNavigate() {
        navigate(AppRoutes.NOT_FOUND);
    }

    function onClickShowSimpleAlert() {
        alertStore.show('Alert', () => {
            console.log('You clicked positive label');
        }, () => {
            console.log('You clicked negative label');
        });
    }

    function onClickShowComplexAlert() {
        alertStore.msg = 'The message';
        alertStore.negativeLabel = 'Neg';
        alertStore.positiveLabel = 'Pos';
        alertStore.neutralLabel = 'Neutral';
        alertStore.positiveListener = function positiveListener() {
            console.log('You clicked positive label');
        };
        alertStore.negativeListener = function negativeLabel() {
            console.log('You clicked negative label');
        };
        alertStore.neutralListener = function neutralListener() {
            console.log('You clicked neutral listener');
        }
        alertStore.visible = true;
    }

    function onClickDim() {
        appStore.incremenetDimmer();
        setTimeout(() => {
            appStore.decrementDimmer();
        }, 3000);
    }

    function onClickDisableActions() {
        appStore.disableActions();
        setTimeout(() => {
            appStore.enableActions();
        }, 3000);
    }

    function onShowPopover(e) {
        setPopupAnchor(e.target);
        setPopoverOpen(true);
    }

    function onClosePopover() {
        setPopoverOpen(false);
        setPopupAnchor(null);
    }

    function showModal() {
        exampleModalStore.showSignal('modal content');
    }

    return (
        <PageLayoutComponent
            className = { 'UiKitPage' }
            modals = {
                <>
                    <ExampleModal />,
                </>
            } >

            <div className = { 'AppContent' } >
                <div className = { 'UiKit' } >Ui Kit Preview</div>

                <div className = { 'FeatureBox' }>
                    <label>Page</label>
                    <div onClick = { onClickNavigate } className = { 'Clickable' }>Navigate to Not found page</div>
                </div>

                <div className = { 'FeatureBox' }>
                    <label>Alert</label>
                    <div onClick = { onClickShowSimpleAlert } className = { 'Clickable' }>Show simple alert</div>
                    <div onClick = { onClickShowComplexAlert } className = { 'Clickable' }>Show complex alert</div>
                </div>

                <div className = { 'FeatureBox' } >
                    <label>Modal</label>
                    <div onClick = { showModal } >Show modal</div>
                </div>

                <div className = { 'FeatureBox' }>
                    <label>Dim</label>
                    <div onClick = { onClickDim } className = { 'Clickable' }>Dim/Blur for 3 seconds</div>
                </div>

                <div className = { 'FeatureBox' }>
                    <label>Disable events</label>
                    <div onClick = { onClickDisableActions } className = { 'Clickable' }>Disable pointer events for 3 seconds</div>
                </div>

                <div className = { 'FeatureBox' }>
                    <label>Loading indicator</label>
                    <LoadingIndicator inline = { true } />
                    <LoadingIndicator />
                </div>

                <div className = { 'FeatureBox' }>
                    <label>Popup over</label>
                    <div>
                        <span onClick = { onShowPopover } > Click to show popover</span>
                    </div>
                    <Popover
                        anchorEl = { popoverAnchor }
                        open = { popoverOpen }
                        onClose = { onClosePopover } >
                        Popover content<br />
                        It could be any html/react node
                    </Popover>
                </div>

                <div className = { 'FeatureBox' }>
                    <label>Tooltips</label>
                    <div>
                        <Tooltip title = { 'tooltiptext' }>
                            <span>Trigget text</span>
                        </Tooltip>
                    </div>
                    <TextWithTooltip text = { 'label' } tooltipText = { 'tooltip text' } />
                </div>

                <div className = { 'FeatureBox' }>
                    <label>Uploader</label>
                    <div>
                        Upload files
                        <UploaderComponent
                            id = { this }
                            params = { {
                                'maxSize': 73400320, // 70MB
                                'onExceedLimit': () => {
                                    this.props.alertStore.show('', 'Максималният размер на файловете е 70MB!');
                                },
                                'multi': true,
                                onReadFileAsBase64: (base64File, responseData, files: any[], i: number) => {
                                    alertStore.show('success');
                                },
                            } } />
                    </div>
                </div>

                <div className = { 'FeatureBox' } >
                    <label>Headings</label>
                    <div className={'H1'}>Heading 1</div>
                    <div className={'H2'}>Heading 2</div>
                    <div className={'H2_1'}>Heading 2.1</div>
                    <div className={'H3'}>Heading 3</div>
                    <div className={'B1'}>Body 1</div>
                    <div className={'B2'}>Body 2</div>
                    <div className={'B3'}>Body 3</div>
                    <div className={'B4'}>Body 4</div>
                </div>

                <div className = { 'FeatureBox' }>
                    <label>Buttons</label>
                    <Actions>
                        <Button>
                            <Svg size = { SvgSize.CUSTOM } svg = { SvgLogo } />
                            Button rounded color 1 default padding default radius
                        </Button>
                        <Button
                            color = { BUTTON_COLOR.SCHEME_2 }
                            padding = { BUTTON_PADDING.PADDING_24 }
                            radius = { BUTTON_RADIUS.MAX }>
                            <Svg size = { SvgSize.CUSTOM } svg = { AcUnitIcon } />
                            Button rounded color 2 24 padding max radius
                        </Button>
                        <Button
                            color = { BUTTON_COLOR.SCHEME_3 }
                            padding = { BUTTON_PADDING.PADDING_48 } >
                            Button rounded color 3 48 padding
                        </Button>
                    </Actions>
                    <Actions height = { ACTIONS_HEIGHT.HEIGHT_42 } layout = { ACTIONS_LAYOUT.LAYOUT_COLUMN_FULL } >
                        <Button
                            type = { BUTTON_TYPE.TEXT_INLINE }>
                            Button inline color 1 default padding default radius
                        </Button>
                        <Button
                            type = { BUTTON_TYPE.TEXT_INLINE }
                            color = { BUTTON_COLOR.SCHEME_2 } >
                            Button inline color 2 default padding default radius
                        </Button>
                        <Button
                            type = { BUTTON_TYPE.TEXT_INLINE }
                            color = { BUTTON_COLOR.SCHEME_3 } >
                            Button inline color 3 default padding default radius
                        </Button>
                    </Actions>
                </div>

                <div className = { 'FeatureBox' }>
                    <label>Table</label>
                    <Table
                        widths = { ['30%', '70%'] }
                        legend = { ['Column1', 'Column 2'] }
                        tableStore = { new TableStore(0, [], () => {
                            // used to fetech new data
                        }) }
                        rows = { [
                            createTableRow([
                                createTableCellString('Row 1'),
                                createTableCellString('Row 2'),
                            ]),
                            createTableRow([
                                createTableCellString('Row 3'),
                                createTableCellString('Row 4'),
                            ]),
                        ] } />

                </div>

            </div>

        </PageLayoutComponent>
    )

}

export default inject((stores) => stores)(observer(UiKitPage));

// function a() {
//     return (
//         <div className={'FlexRow'} style={{
//             gap: '20px',
//             padding: '100px',
//             background: 'var(--color-primary)',
//         }}>
//             <div className={'H1'}>Heading 1</div>
//             <div className={'H2'}>Heading 2</div>
//             <div className={'H2_1'}>Heading 2.1</div>
//             <div className={'H3'}>Heading 3</div>
//             <div className={'B1'}>Body 1</div>
//             <div className={'B2'}>Body 2</div>
//             <div className={'B3'}>Body 3</div>
//             <div className={'B4'}>Body 4</div>
//         </div>
//         <div style = { { 'width': '1000px', 'height': '500px', 'margin': 'auto' } } className = { 'FlexSingleCenter FlexColumn' } >
//             <Input
//                 label = { 'test' } />

//             <Input
//                 label = { 'test' } error />

//             <Select
//                 label = { 'test' } >
//                 <MenuItem value = { 1 } >1</MenuItem>
//                 <MenuItem value = { 2 } >2</MenuItem>
//             </Select>

//             <Select
//                 label = { 'test' }
//                 error >
//                 <MenuItem value = { 1 } >1</MenuItem>
//                 <MenuItem value = { 2 } >2</MenuItem>
//             </Select>

//             <Actions>
//                 <Button type = {BUTTON_TYPE.ROUNDED } color = { BUTTON_COLOR.SCHEME_1 } >button 01</Button>
//                 <Button type = {BUTTON_TYPE.ROUNDED } color = { BUTTON_COLOR.SCHEME_2 } >button 02</Button>
//                 <Button type = { BUTTON_TYPE.TEXT_INLINE } color = { BUTTON_COLOR.SCHEME_1 } >button 03</Button>
//                 <Button type = { BUTTON_TYPE.TEXT_INLINE } color = { BUTTON_COLOR.SCHEME_2 } >button 04</Button>
//             </Actions>
//         </div>
//         <Tooltip title = { 'some info' } arrow ><span>TOOLTIP</span></Tooltip>
//         <TextWithTooltip text='TEXT WITH TOOLTIP' tooltipText='TOOLTIP TEXT' />
//         <span onClick = { onClickNavigate } >UiKitPage</span>
//         <span onClick = { onClickShowAlert } >show alert</span>
//     )
// }
