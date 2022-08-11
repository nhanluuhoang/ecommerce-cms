import { PlusOutlined } from '@ant-design/icons';
import { Modal, message, Upload } from 'antd';
import type { RcFile } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import React, { useEffect, useState } from 'react';
import { FieldError } from 'react-hook-form';
import ImgCrop from 'antd-img-crop';
import { getBase64 } from '../../../services/utils/getBase64';

const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
        return true
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
        return true
    }
    
    return isJpgOrPng && isLt2M;
};

const handleCustomRequest = (options: any) => {
    const { onSuccess, file } = options;
    setTimeout( () => onSuccess(null, file), 0)
}

type IImages = {
    id: number;
    path: string;
}

type IUploadImageProps = {
    name?: string;
    imageListLength?: number;
    label?: string;
    classRequired?: boolean;
    labelCol?: number;
    inputCol?: number;
    error?: FieldError | undefined;
    images?: IImages[] | string,
    onUpload: any
};

export const UploadImage = (props: IUploadImageProps) => {
    const {
        name,
        imageListLength = 0,
        label,
        classRequired,
        labelCol,
        inputCol,
        error,
        images,
        onUpload
    } = props;
    
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [previewTitle, setPreviewTitle] = useState('')
    const [fileList, setFileList] = useState<UploadFile[]>([])
    
    useEffect(() => {
        // build structure object of antd
        let result: UploadFile[] = []
        if (Array.isArray(images)) {
            images?.map((item: IImages, index: number) => {
                result.push({
                    uid: (item.id).toString(),
                    name: item?.path?.split('/')?.at(-1) || '',
                    status: 'done',
                    url: item?.path,
                })
            })
        } else {
            images && result.push({
                uid: '1',
                name: images?.split('/').at(-1) || '',
                status: 'done',
                url: images,
            })
        }
        
        setFileList(result)
    }, [images])
    
    const handleCancel = () => setPreviewVisible(false)
    
    const transformBase64 = async (images: any) => {
        const result = []
        for (const image of images) {
            const base64 = await getBase64(image.originFileObj)
            result.push(base64)
        }
        return result
    }
    
    const handleChange = async ({ file, fileList }: { file: UploadFile, fileList: UploadFile[] }) => {
        setFileList(fileList)
        
        onUpload(await transformBase64(fileList))
    }
    
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };
    
    const uploadButton = (
        <>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </>
    );
    
    return (
        <div className={`ant-row ant-form-item ${error?.message ? ' ant-input-item-with-help ant-form-item-has-error' : ''}`}>
            <div className={`ant-col ant-col-${labelCol || 8} ant-form-item-label`}>
                {label && <label className={`${classRequired ? 'ant-form-item-required' : ''}`}>
                    {label}
                </label>}
            </div>
            <div className={`ant-col ant-col-${inputCol || 16} ant-form-item-control`}>
                <div className={`ant-form-item-control-input`}>
                    <div className={`ant-form-item-control-input-content`}>
    
                        <ImgCrop grid rotate>
                            <Upload
                                id={name}
                                listType='picture-card'
                                fileList={fileList}
                                beforeUpload={beforeUpload}
                                onPreview={handlePreview}
                                onChange={handleChange}
                                customRequest={handleCustomRequest}
                            >
                                {fileList?.length >= imageListLength ? null : uploadButton}
                            </Upload>
                        </ImgCrop>
                        
                        <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
                            <img alt="img-products" style={{ width: '100%' }} src={previewImage} />
                        </Modal>

                    </div>
                </div>
                {error?.message && (
                    <div className={`class="ant-form-item-explain ant-form-item-explain-connected"`}>
                        <div className='ant-form-item-explain-error'>
                            {error.message}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
