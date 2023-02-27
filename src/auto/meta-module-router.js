import express from 'express';
import {
    CreateMetaModules,
    GetAllMetaModules,
    PublishTheModule,
    GetMetaModulesByIdHandler,
    UpdateMetaModulesByIdHandler,
    DeleteMetaModulesByIdHandler,
    ClearAllMetaModules, 
    SoftDeleteMetaModulesByIdHandler,
    GetAllMetaModulesByStatus
} from "./controller/meta.module.controller";

const router = express.Router();

// Find route and put handler
router.route('/')
    .get(GetAllMetaModules)
    .post(CreateMetaModules)
    .delete(ClearAllMetaModules)

router.route('/publish/:id')
    .put(PublishTheModule)


router.route('/:id')
    .get(GetMetaModulesByIdHandler)
    .put(UpdateMetaModulesByIdHandler)

router.route('/inactive/:id')
    .delete(SoftDeleteMetaModulesByIdHandler)
router.route('/fdelete/:id')
    .delete(DeleteMetaModulesByIdHandler)


router.route('/status/:status')
    .get(GetAllMetaModulesByStatus)

export default router;