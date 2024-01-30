// middleware which will validate and sanitize incoming data from request body for user signup of name, email, password
import { body, ValidationChain, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

//validating before going to route handlers which is done in incremental segments
// each middleware will be validated before going on to the next middleware until info can be stored in db
// validaton chain is a list of validation checks
export const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        // running a loop to verify conditions, if error: send to client.
        for (let validation of validations) {
            const errors = await validation.run(req);
            if (!errors.isEmpty()) {
                break;
            }
        }
        // check if should continue to next middleware or go back to first middleware
        const errors = validationResult(req); // final result of validation
        if (errors.isEmpty()) {// no errors, working fine
            return next(); // greenlight to continue to next middleware
        }
        return res.status(422).json({ errors: errors.array() }); //data can't be processed, send error to client
    };
};

// validations are separated for specific routes for code reusability
// login validation 
export const loginValidator = [
    //validation checks of data import from body for email, password
    body("email").trim().isEmail().withMessage("That is an invalid email address."), // trim removes whitespace
    body("password").trim().isLength({ min: 6 }).withMessage("Password should contain atleast 6 characters."),
];// array list of validation checks for signup

export const signupValidator = [
    //validation checks of data import from body for name
    body("name").notEmpty().withMessage("Your name is required."),
    ...loginValidator,// using spread syntax which exapnds elements into signupValidator array; includes all validation checks from loginValidator into signupValidator for reuse.
];// array list of validation checks for signup