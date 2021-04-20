import * as yup from 'yup'

const letterRegex = /^[aA-zZ\s]+$/;

export const loginSchema = yup.object().shape({
    email : yup.string().email().required(),
    password : yup.string().min(6).max(20).required()
})
export const updateSchema = yup.object().shape({
    firstname: yup.string().max(30).required()
    .matches(letterRegex, "Only alphabets are allowed for this field"),
    lastname: yup.string().max(30).required()
    .matches(letterRegex, "Only alphabets are allowed for this field ")
})