import schoolController from './schoolController'
import collegeController from './collegeController'
import userController from "./userController";
export default {
    ...schoolController,
    ...collegeController,
    ...userController
}
