import React, { useState } from 'react';
import { useComponentVisible } from '../../hooks/useComponentVisible';
import { UseFormRegisterReturn } from 'react-hook-form';

type ITreeData = {
    id: number;
    title: string;
    children?: ITreeData[]
};

type IItemProps = {
    data: any;
    space: number
    onSelect: (value: any) => void
}

export const Item = (props: IItemProps) => {
    const { data, space, onSelect } = props;
    
    const handleOnClick = (value: any) => {
        onSelect(value)
    }
    
    return (
        <div key={data.id} className="ant-select-tree-treenode ant-select-tree-treenode-switcher-open ant-select-tree-treenode-leaf-last" draggable="false" aria-grabbed="false">
            <span aria-hidden="true" className="ant-select-tree-indent">
                {[...Array(space)].fill(null).map((item: any, index: number) => (
                    <span key={index} className={`ant-select-tree-indent-unit ant-select-tree-indent-unit-${index % 2 == 0 ? 'start' : 'end'}`}></span>
                ))}
            </span>
            <span className="ant-select-tree-switcher ant-select-tree-switcher-noop"></span>
            <span onClick={handleOnClick} itemID={data.id} title={data.title} className="ant-select-tree-node-content-wrapper ant-select-tree-node-content-wrapper-normal">
                {data.title}
            </span>
        </div>
    );
}

export const ItemHaveChild = (props: IItemProps) => {
    const { data, space, onSelect } = props;
    const newSpace = space
    const handleOnClick = (value: any) => {
        onSelect(value)
    }
    
    return (
        <div key={data.id}>
            <div className="ant-select-tree-treenode ant-select-tree-treenode-switcher-open" draggable="false" aria-grabbed="false">
                <span aria-hidden="true" className="ant-select-tree-indent">
                    {[...Array(space)].fill(null).map((item: any, index: number) => (
                        <span key={index} className={`ant-select-tree-indent-unit ant-select-tree-indent-unit-${index % 2 == 0 ? 'start' : 'end'}`}></span>
                    ))}
                </span>
                    <span className="ant-select-tree-switcher ant-select-tree-switcher_open">
                    <span role="img" aria-label="caret-down" className="anticon anticon-caret-down ant-select-tree-switcher-icon">
                        <svg viewBox="0 0 1024 1024" focusable="false" data-icon="caret-down" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                            <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
                        </svg>
                    </span>
                </span>
                <span onClick={handleOnClick} itemID={data.id} title={data.title} className="ant-select-tree-node-content-wrapper ant-select-tree-node-content-wrapper-open">
                    {data.title}
                </span>
            </div>
     
            {data.children && data.children.map((item: any, index: number) => {
                if (item.children && item.children?.length > 0) {
                    return <ItemHaveChild data={item} space={ newSpace + 1 } key={item.id} onSelect={handleOnClick} />
                } else {
                    return <ItemChild data={item} space={ newSpace + 1 } key={item.id} onSelect={handleOnClick} />
                }
            })}
        </div>
    );
}

export const ItemChild = (props: IItemProps) => {
    const { data, space, onSelect } = props;
    
    const handleOnClick = (value: any) => {
        onSelect(value)
    }
    
    return (
        <div key={data.id} className="ant-select-tree-treenode ant-select-tree-treenode-switcher-open" draggable="false" aria-grabbed="false">
            <span aria-hidden="true" className="ant-select-tree-indent">
                {[...Array(space)].map((item: any, index: number) => (
                    <span key={index} className={`ant-select-tree-indent-unit ant-select-tree-indent-unit-${index % 2 == 0 ? 'start' : 'end'}`}></span>
                ))}
            </span>
            <span className="ant-select-tree-switcher ant-select-tree-switcher-noop"></span>
            <span onClick={handleOnClick} itemID={data.id} title={data.title} className="ant-select-tree-node-content-wrapper ant-select-tree-node-content-wrapper-normal">
                {data.title}
            </span>
        </div>
    )
}

type IProps = {
    label?: string;
    labelCol?: string;
    inputCol?: string;
    classRequired?: boolean;
    treeData: ITreeData[];
    registration?: Partial<UseFormRegisterReturn>,
    onSelectValue: ({ parent_id, parent_title }: { parent_id: number, parent_title: string }) => void
}

export const TreeSelectField = ({ label, treeData, labelCol, inputCol, classRequired, registration, onSelectValue}: IProps) => {
    const [openSelect, setOpenSelect] = useState('')
    const [openSelect1, setOpenSelect1] = useState('')
    const [style, setStyle] = useState({maxHeight: '400px', overflow: 'auto', minWidth: '253px', width: '253px', left: '-975px', top: '-939px'})
    const [click, setClick] = useState(false)
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(true);
    
    const handleSelectBox = () => {
        if (click) {
            setClick(!click)
            setOpenSelect('')
            setOpenSelect1('ant-select-dropdown-hidden')
            setStyle({maxHeight: '400px', overflow: 'auto', minWidth: '253px', width: '253px', left: '-975px', top: '-939px'})
        } else {
            setClick(!click)
            setOpenSelect('ant-select-focused ant-select-open')
            setOpenSelect1('')
            setStyle({maxHeight: '400px', overflow: 'auto', minWidth: '330px', width: '330px', left: '0', top: '35px'})
        }
    }
    
    if (isComponentVisible === false) {
        setClick(!click)
        setOpenSelect('')
        setOpenSelect1('ant-select-dropdown-hidden')
        setStyle({maxHeight: '400px', overflow: 'auto', minWidth: '253px', width: '253px', left: '-975px', top: '-939px'})
        setIsComponentVisible(true)
    }
    
    const handleSelectValue = (data: any) => {
        onSelectValue({
            parent_id: data.target.attributes['itemid'].value,
            parent_title: data.target.attributes['title'].value
        })
    }
    
    return (
        <div className='ant-row ant-form-item'>
            <div className={`ant-col ant-col-${labelCol ?? '6'} ant-form-item-label`}>
                {label && <label className={`${classRequired ? 'ant-form-item-required' : ''}`} title={label}>
                    {label}
                </label>}
            </div>
            <div className={`ant-col ant-col-${inputCol ?? '12'} ant-form-item-control`}>
                <div id="container">
                    <div
                        ref={ref}
                        onClick={handleSelectBox}
                        className={`ant-select ant-tree-select ant-select-single ant-select-show-arrow ${openSelect}`}
                        style={{width: '100%'}}
                    >
                        <div className="ant-select-selector">
                            <span className="ant-select-selection-search">
                                <input
                                    type="search"
                                    autoComplete="off"
                                    className="ant-select-selection-search-input"
                                    role="combobox"
                                    aria-haspopup="listbox"
                                    aria-owns="rc_select_2_list"
                                    aria-autocomplete="list"
                                    aria-controls="rc_select_2_list"
                                    unselectable="on"
                                    id="rc_select_2"
                                    {...registration}
                                    aria-expanded="false"
                                />
                            </span>
                        </div>
                        <span className="ant-select-arrow" unselectable="on" aria-hidden="true" style={{userSelect: 'none'}}>
                            <span role="img" aria-label="down" className="anticon anticon-down ant-select-suffix">
                                <svg viewBox="64 64 896 896" focusable="false" data-icon="down" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                                    <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                                </svg>
                            </span>
                        </span>
                    </div>
                </div>
            
                <div style={{position: 'absolute', top: '0px', left: '0px', width: '100%'}}>
                    <div className='ant-row'>
                        <div
                            className={`ant-select-dropdown ant-tree-select-dropdown ant-select-dropdown-placement-bottomLeft ${openSelect1} ant-col-${inputCol ?? '12'}`}
                            style={style}
                        >
                            <div>
                                <div>
                                    <div role="tree" className="ant-select-tree">
                                        <div>
                                            <input style={{width: '0px', height: '0px', display: 'flex', overflow: 'hidden', opacity: '0', border: '0px', padding: '0px', margin: '0px'}} />
                                        </div>
                                        <div className="ant-select-tree-treenode" aria-hidden="true"
                                             style={{position: 'absolute', pointerEvents: 'none', visibility: 'hidden', height: '0px', overflow: 'hidden'}}>
                                            <div className="ant-select-tree-indent">
                                                <div className="ant-select-tree-indent-unit"></div>
                                            </div>
                                        </div>
                                        <div className="ant-select-tree-list" style={{position: 'relative'}}>
                                            <div className="ant-select-tree-list-holder" style={{maxHeight: '256px', overflowY: 'hidden', overflowAnchor: 'none'}}>
                                                <div>
                                                    <div className="ant-select-tree-list-holder-inner" style={{display: 'flex', flexDirection: 'column'}}>
        
                                                        {treeData && treeData.map((item, index) => {
                                                            if (item.children && item.children.length > 0) {
                                                                return <ItemHaveChild data={item} space={0} key={item.id} onSelect={handleSelectValue} />
                                                            } else {
                                                                return <Item data={item} key={item.id} space={0} onSelect={handleSelectValue} />
                                                            }
                                                        })}
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ant-select-tree-list-scrollbar" style={{width: '8px', top: '0px', bottom: '0px', right: '0px', position: 'absolute', display: 'none'}}>
                                                <div className="ant-select-tree-list-scrollbar-thumb" style={{width: '100%', height: '128px', top: '0px', left: '0px', position: 'absolute', background: 'rgba(0, 0, 0, 0.5)', borderRadius: '99px', cursor: 'pointer', userSelect: 'none'}}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
