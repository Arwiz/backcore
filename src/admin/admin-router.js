import express from 'express';
import {
    CreateOrganizationHandler,
    DeleteOrganizationByIdHandler,
    GetAllOrganizationsHandler,
    UpdateOrganizationByIdHandler,
    GetOrganizationByIdHandler
} from "./controller/orgnization.controller";
const router = express.Router();

// Find route and put handler
router.route('/')
    .get(GetAllOrganizationsHandler)
    .post(CreateOrganizationHandler)

router.route('/:id')
    .get(GetOrganizationByIdHandler)
    .put(UpdateOrganizationByIdHandler)
    .delete(DeleteOrganizationByIdHandler)


export default router;