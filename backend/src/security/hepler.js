import FileSystem from 'fs';

const createUploadFloder = () => {
    const dir = './uploads';
    if (!FileSystem.existsSync(dir)){
        FileSystem.mkdirSync(dir);
        console.log("Upload folder created");
    }
};

export{ createUploadFloder };