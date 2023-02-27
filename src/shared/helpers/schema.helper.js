import mongoose from 'mongoose';
import {dataTypes} from "../models/data";
import {MetaModule} from "../../auto/models";
import {EN_ModuleStatus} from "../../auto/models/app-data";
const Schema = mongoose.Schema;

// Create Schema by Meta module fields
function schemaDesignFromMetaModule(metamodule) {
    const collectionName = metamodule.moduleName;
    let schema = {
        clientId: {
            type: Schema.Types.ObjectId,
            required: true
        },
        projectId: {
            type: Schema.Types.ObjectId,
            required: true
        },
        moduleId: {
            type: Schema.Types.ObjectId,
            required: true,
        }
    };
    metamodule.fields.forEach((fieldObj) => {
        const obj = {};
        schema[fieldObj.fieldId] = generateField(fieldObj);
    });
    return new Schema(schema);
}

function generateField(field) {
    let obj = {};
    obj = {...obj, ...getSchemaType(field.fieldType)};
    obj['required'] = field.required ? field.required : undefined;
    return obj;
}

function getSchemaType(schemaType) {
    switch (schemaType) {
        case dataTypes.TEXT:
            return {type: 'String'};
            break
        case dataTypes.BOOLEAN:
            return {type: 'Boolean'}
            break
        case dataTypes.DATE:
            return {type: 'Date'};
            break
        case dataTypes.INTEGER:
        case dataTypes.DECIMAL:
        case dataTypes.COST:
            return {type: 'Number'};
            break
        case dataTypes.MULTI_SELECT:
        case dataTypes.SINGLE_SELECT:
        case dataTypes.DICT:
        case dataTypes.KEY_VALUE:
            return {type: 'Map'};
            break
        case dataTypes.LOG:
            return {type: 'Array'}
            break
        default:
            return {type: 'String'};
            break
    }
    return;
}


// Get Dynamic Model by url/ moduleId plural
async function  getDynamicModuleByUrl(moduleId) {
    // Call Dynamic
    let moduleData = await MetaModule.find({moduleId: moduleId});
    if (moduleData && moduleData.length > 0) {
        const foundDataModel = moduleData[0];
        // console.log("found data model: ", foundDataModel);

        if(foundDataModel.status === EN_ModuleStatus.PUBLISHED)  {
            const sch =  schemaDesignFromMetaModule(foundDataModel);
            console.log("sch: ", sch)
            const foundModel =  await mongoose.models[foundDataModel.moduleName] || await mongoose.model(foundDataModel.moduleName, sch); 
            // const foundModel =  await mongoose.model(foundDataModel.moduleName, sch);            
            console.log("found model: ", foundModel);
            return foundModel;
        }
    }
    return null;
}

async function normalizeAutoGeneration(dataUrl, methodType, payload) {
    // Get The schema from the Collection
    // let moduleData = await MetaModule.find({moduleId: dataUrl});
    // if (moduleData && moduleData.length > 0) {
    //     const foundDataModel = moduleData[0];
    //     // Call Dynamic
    //     const sch = schemaDesignFromMetaModule(foundDataModel);
    //     const checkedThenGetDynamicModule = mongoose.models[foundDataModel.moduleName];
    //     if (!checkedThenGetDynamicModule) {
    //         next(Error('Module is not published..!'));
    //         return;
    //     }
    //     switch (methodType) {
    //         case 'POST':
    //             return  await checkedThenGetDynamicModule.create(payload);
    //             return addStatus;
    //             break
    //         case 'GET':
    //             const addStatus = await checkedThenGetDynamicModule.create(payload);
    //             return addStatus;
    //         case 'PUT':
    //             const addStatus = await checkedThenGetDynamicModule.update(payload);
    //             return addStatus;
    //         case 'DELETE':
    //             const addStatus = await checkedThenGetDynamicModule.create(payload);
    //             return addStatus;
    //
    //     }
    //
    //     }


}





export default schemaDesignFromMetaModule;
export {getDynamicModuleByUrl};