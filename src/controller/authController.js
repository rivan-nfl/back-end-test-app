import sendEmail from "../service/email.js";
import { client } from "../service/database.js";

import error from "../helper/error.js";
import inputValidation from "../helper/validation.js";

async function register(req, res) {
    try {
        const { email, password, confirmPassword } = req.body;

        // Validation
        if(!email || !password || !confirmPassword) throw error(400, 'All fields are required !');
        if(password !== confirmPassword) throw error(400, 'Password did not match !');
        if(!inputValidation(password).success) throw error(400, inputValidation(password).message);

        // create user to database
        const createdUser = await client.query(`
            INSERT INTO users(
                email,
                password
            )
            VALUES (
                '${email}',
                '${password}'
            )
            RETURNING user_id, email;
        `)

        // send email
        await sendEmail(email);

        res.status(201).json({
            success: true,
            message: 'Success Sign Up',
            data: createdUser.rows[0]
        })

    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Failed to Sign Up'
        })
    }
}

export {
    register
}