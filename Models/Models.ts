/// <reference path="../GSS/sheet.ts" />
/// <reference path="../Tables/Tables.ts" />
/// <reference path="../Settings.ts" />


/**
 * Descripción de las columnas de cada
 * hoja dentro del libro a usar.
 */
namespace MODELS {

    /**
     * Datos que debe contener una columna.
     */
    type col = {
        name: string,
        data_type: string,
        col?: string,
        verbose_name?: string,
        default?: any,
        choices?: {},
        max?: number,
        min?: number,
        auto_add?: any,
    }

    /**
     * Templates sheet model.
     */
    export function TemplateModel() {

        class Template_Model extends SHEET.ModelSheet {
            sheet_name = SETTINGS.SHEET_TEMPLATES;
            cols = TABLES.TEMPLATES_TABLE;

            constructor() {
                super();
                this.make();
            }
        }

        return new Template_Model();
    }

    /**
     * Data sheet Model.
     */
    export function DataModel(table: col[] = TABLES.DATA_TABLE) {

        class Data_Model extends SHEET.ModelSheet {
            sheet_name = SETTINGS.SHEET_DATA;
            cols = table;

            constructor() {
                super();
                this.make();
            }
        }

        return new Data_Model();
    }

    /**
     * Message sheet model.
     */
    export function MsgModel() {

        class Msg_Model extends SHEET.ModelSheet {
            sheet_name = SETTINGS.SHEET_MSGS;
            cols = TABLES.MSGS_TABLE;

            constructor() {
                super();
                this.make();
            }
        }

        return new Msg_Model();
    }


    export function DataModelFullData(): SHEET.ModelSheet {
        const dataModel = DataModel();
        const headers = dataModel.sheet
            .getRange(1, 5, 1, dataModel.sheet.getLastColumn())
            .getValues()[0]
        let new_table: col[] = [...TABLES.DATA_TABLE]
        if (headers.length > 0) {
            for (const header of headers) {
                if (header) {
                    new_table.push(
                        { name: header, data_type: "string", verbose_name: header, default: '' }
                    )
                }
            }
        }

        return DataModel(new_table);
    }
}
