import schoolController from './schoolController'
import collegeController from './collegeController'
import userController from "./userController";
import applyController from "./applyController";
import oauthController from './oauthController'
export default {
    ...schoolController,
    ...collegeController,
    ...userController,
    ...applyController,
    ...oauthController
}
