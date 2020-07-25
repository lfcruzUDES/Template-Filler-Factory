namespace TABLES {

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


    export const TEMPLATES_TABLE: col[] = [
        { name: "name", data_type: "string", verbose_name: "Nombre" },
        { name: "url", data_type: "string", verbose_name: "Url de las plantillas" },
        { name: "folder", data_type: "string", verbose_name: "Id del folder donde se guardarán los documentos" },
        { name: "use", data_type: "string", verbose_name: "Usar" },
    ];

    export const DATA_TABLE: col[] = [
        { name: "date_time", data_type: "datetime", verbose_name: "Marca temporal", auto_add: true },
        { name: "email", data_type: "string", verbose_name: "Correo electrónico" },
        { name: "url", data_type: "string", verbose_name: "Url del documento" },
        { name: "status", data_type: "string", verbose_name: "Estado" },
    ];

    export const MSGS_TABLE: col[] = [
        { name: "subject", data_type: "string", verbose_name: "Asunto" },
        { name: "msg", data_type: "string", verbose_name: "Mensaje" },
        { name: "format", data_type: "string", verbose_name: "Formato" },
        { name: "use", data_type: "string", verbose_name: "Usar" },
    ];

}
