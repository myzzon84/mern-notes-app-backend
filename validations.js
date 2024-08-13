import * as Yup from 'yup';

export const createAccountValidationYup = async (req, res, next) => {
    let validationSchema = Yup.object({
        fullName: Yup.string()
            .required('Full name required')
            .min(3, 'Full name min 3 char'),
        email: Yup.string().required('Email required').email('Email not valid'),
        password: Yup.string()
            .required('Password required')
            .min(6, 'Password min 6 char'),
    });

    await validationSchema
        .validate(req.body, { abortEarly: false })
        .then(() => {
            next();
        })
        .catch((err) => {
            console.log(err.errors);
            return res.status(400).json({ errors: err.errors });
        });
};

export const loginValidationYup = async (req, res, next) => {
    let validationSchema = Yup.object({
        email: Yup.string().required('Email required').email('Email not valid'),
        password: Yup.string()
            .required('Password required')
            .min(6, 'Password min 6 char'),
    });

    await validationSchema
        .validate(req.body, { abortEarly: false })
        .then(() => {
            next();
        })
        .catch((err) => {
            console.log(err.errors);
            return res.status(400).json({ errors: err.errors });
        });
};

export const createNoteValidationYup = async (req, res, next) => {
    let validationSchema = Yup.object({
        title: Yup.string().required('Title is require field').min(6, 'Title min 6 char'),
        content: Yup.string().required('Content is require field').min(20, 'Content min 20 char'),
    });

    await validationSchema
        .validate(req.body, { abortEarly: false })
        .then(() => {
            next();
        })
        .catch((err) => {
            console.log(err.errors);
            return res.status(400).json({ errors: err.errors });
        });
}