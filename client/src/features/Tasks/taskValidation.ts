import * as yup from 'yup';


export const validationScehma = yup.object({
    title: yup.string().required(),
    desc: yup.string().required(),
})
