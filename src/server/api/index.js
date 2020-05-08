import schoolController from './schoolController'
import collegeController from './collegeController'
import userController from "./userController";
import applyController from "./applyController";
import oauthController from './oauthController'
import notifyDraftController from './notifyDraftController'
export default {
    ...schoolController,
    ...collegeController,
    ...userController,
    ...applyController,
    ...oauthController,
    ...notifyDraftController
}
