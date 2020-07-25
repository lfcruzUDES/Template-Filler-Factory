namespace DRIVE {

    export function clone(name:string, file_id: string, folder_id: string) {
        const folder = DriveApp.getFolderById(folder_id)
        const file = DriveApp.getFileById(file_id);
        const new_file = file.makeCopy(name, folder);
        return new_file;
    }

}