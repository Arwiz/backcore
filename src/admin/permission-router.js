import express from 'express';
import {
    CreatePermission, DeletePermissionByIdHandler,
    GetAllPermissions,
    GetPermissionByIdHandler,
    UpdatePermissionByIdHandler
} from "./controller/permission.controller";
const router = express.Router();

// Find route and put handler
router.route('/')
    .get(GetAllPermissions)
    .post(CreatePermission)

router.route('/:id')
    .get(GetPermissionByIdHandler)
    .put(UpdatePermissionByIdHandler)
    .delete(DeletePermissionByIdHandler)

export default router;