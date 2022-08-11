import React, { useEffect, useState } from 'react';
import { ContentLayout } from '../../../components/layouts/ContentLayout';
import { InputField, RadioField, SelectField } from '../../../components/form';
import { getUser, updateUser } from '../api/users';
import { useParams } from "react-router-dom";
import { Button } from '../../../components/elements';
import { SaveOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import { getAddresses } from '../api/addresses';
import { IAddresses, IAddressParams, IUser } from '@/pages/users/interfaces';

const schema = yup.object({
    email: yup
    .string()
    .email("Please enter valid email address")
    .required("Please enter your email address"),
    phone: yup
    .string()
    .min(10, "Your phone must be at least 10 characters or greater")
    .max(11, "Your phone must be at least 11 characters or less")
    .required("Please enter your phone"),
    full_name: yup
    .string()
    .required("Please enter your full name"),
    gender: yup
    .string()
    .required("Please select your gender"),
    province_id: yup
    .string()
    .required("Please select your province"),
    district_id: yup
    .string()
    .required("Please select your district"),
    ward_id: yup
    .string()
    .required("Please select your ward"),
    address: yup
    .string()
    .required("Please enter your address"),
});

type formData = {
    email: string;
    phone: string;
    full_name: string;
    gender: string;
    province_id: number;
    district_id: number;
    ward_id: number;
    address: string;
}

const radioValues = [
    {
        label: 'Male',
        value: 'male',
    },
    {
        label: 'Female',
        value: 'female',
    }
]

const provinceParams = {
    'filter[kind]': 0,
    'filter[parent_id]': null
}

const districtParams = {
    'filter[kind]': 1
}

const wardParams = {
    'filter[kind]': 2,
}

const layout = {
    labelCol: 6,
    inputCol: 12
}

export const User = () => {
    const { userId } = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [provinces, setProvinces] = useState<IAddresses[] | undefined>()
    const [districts, setDistricts] = useState<IAddresses[] | undefined>()
    const [wards, setWards] = useState<IAddresses[] | undefined>()
    const {
        register,
        handleSubmit,
        reset,
        formState: { isValid, isSubmitting, errors },
    } = useForm<formData>({
        resolver: yupResolver(schema)
    });
    
    const getAddressesByParams =  async (params: IAddressParams) => {
        const addresses = await getAddresses(params)
        return addresses.data
    }
    
    useEffect(() => {
        getUser(userId).then((resp) => {
            let user: IUser, province_id: any, district_id: any, ward_id: any, address: any
            
            user = resp.data
            resp.data?.address?.find((item) => {
                if (item?.default) {
                    province_id = item?.province_id
                    district_id = item?.district_id
                    ward_id = item?.ward_id
                    address = item?.address
                }
            })
    
            const getProvince = getAddressesByParams(provinceParams)
            const getDistrict = getAddressesByParams({...districtParams, 'filter[parent_id]': province_id})
            const getWard = getAddressesByParams({...wardParams, 'filter[parent_id]': district_id})
    
            getProvince.then((data) => {
                setProvinces(data)
                getDistrict.then((data) => {
                    setDistricts(data)
                    getWard.then((data) => {
                        setWards(data)
                        reset({
                            ...user,
                            province_id: province_id,
                            district_id: district_id,
                            ward_id: ward_id,
                            address: address
                        })
                        setIsLoading(false)
                    })
                })
            })
        })
    }, [reset])
    
    const handleUpdate = (value: any) => {
        if (!isValid) return;
        console.log(value)
        
        const dto = {
            ...value, address: [
                {
                    address: value.address,
                    province_id: +value.province_id,
                    district_id: +value.district_id,
                    ward_id: +value.ward_id,
                }
            ]
        }
    
        console.log(dto)
        
        // updateUser()
    }
    
    return (
        <ContentLayout isLoading={isLoading || isSubmitting} breadCrumb={['User', 'Detail']}>
            <form onSubmit={handleSubmit(handleUpdate)}>
                <InputField
                    name='email'
                    label='Email'
                    labelCol={layout.labelCol}
                    inputCol={layout.inputCol}
                    classRequired={true}
                    registration={register('email')}
                    error={errors['email']}
                />
                <InputField
                    name='phone'
                    label='Phone'
                    labelCol={layout.labelCol}
                    inputCol={layout.inputCol}
                    classRequired={true}
                    registration={register('phone')}
                    error={errors['phone']}
                />
                <InputField
                    name='full_name'
                    label='Full Name'
                    labelCol={layout.labelCol}
                    inputCol={layout.inputCol}
                    classRequired={true}
                    registration={register('full_name')}
                    error={errors['full_name']}
                />
    
                <RadioField
                    label='Gender'
                    classRequired={true}
                    values={radioValues}
                    registration={register('gender')}
                />
    
                <SelectField
                    label='Provinces'
                    labelCol={layout.labelCol}
                    inputCol={layout.inputCol}
                    classRequired={true}
                    registration={register('province_id')}
                    values={provinces}
                />
    
                <SelectField
                    label='Districts'
                    labelCol={layout.labelCol}
                    inputCol={layout.inputCol}
                    classRequired={true}
                    registration={register('district_id')}
                    values={districts}
                />
    
                <SelectField
                    label='Wards'
                    labelCol={layout.labelCol}
                    inputCol={layout.inputCol}
                    classRequired={true}
                    registration={register('ward_id')}
                    values={wards}
                />
                
                <InputField
                    name='address'
                    label='Address'
                    labelCol={layout.labelCol}
                    inputCol={layout.inputCol}
                    classRequired={true}
                    registration={register('address')}
                    error={errors['address']}
                />
                
    
                <div style={{width: '100%', justifyContent: 'center', textAlign: 'center'}}>
                    <Button
                        isLoading={isSubmitting}
                        type='submit'
                        icon={<SaveOutlined />}
                    >
                        Update
                    </Button>
                </div>
            </form>
        </ContentLayout>
    );
};
