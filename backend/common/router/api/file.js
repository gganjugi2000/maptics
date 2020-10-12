const asyncHandler = require('express-async-handler');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const logger = require('../../logger/winston');
const formidable = require('formidable');
const path = require('path');

router.post('/upload', asyncHandler(async (req, res) => {
    let data = null;
    let fields = [];
    let files = [];
    let fields_array = [];
    let files_array = [];

    const form = new formidable.IncomingForm(); // 헤더를 만듬
    // 업로드 정보
    form.encoding = 'utf-8';        // 인코딩
    form.uploadDir = require('os').homedir() + path.sep + 'upload';
    form.multiples = true;          // 여러 파일
    form.keepExtensions = true;     // 확장자 표시

    // form타입 필드(text 타입)
    form.on('field', function(field, value) {
        fields.push([field, value]);
        fields_array.push(value);

    // form타입 필드(file 타입)
    }).on('file', function(field, file) {
        let oldPath = file.path;
        let newPath = form.uploadDir + path.sep + file.name;
        data = {
            'code' : 200,
            'msg' : 'success'
        }
        fs.rename(oldPath, newPath, function(err) {
            if(err) {
                data = {
                    'code' : 999,
                    'msg' : err.message
                }
                res.status(200).send(data);
            }
            fs.stat(newPath, function (err, stats) {
                if(err) {
                    data = {
                        'code' : 999,
                        'msg' : err.message
                    }
                    res.status(200).send(data);
                }
            });
        });
        files.push([field, file.name]);
        files_array.push(file.name);
        
    }).on('progress', function(bytesReceived, bytesExpected) {
        let percent_complete = (bytesReceived / bytesExpected) * 100; 
        console.log("============ progress ==================="); 
        console.log("bytesReceiveed ==> ", bytesReceived, " ; bytesExpected ==> ", bytesExpected); 
        console.log(percent_complete.toFixed(2), "% uploaded...");

    }).on('end', function() {
        fields = [];
        files = [];
        fields_array = [];
        files_array = [];
        res.status(200).send(data);

    }).on('error', function(error) {
        data = {
            'code' : 999,
            'msg' : error.message
        }
        res.status(200).send(data);
        
    });

     // end 이벤트 까지 전송된 후 최종 호출
    form.parse(req, (err, field, file) => {
        if(!err) {
            console.log('upload success!!');
        } else {
            console.log('upload fail!!');
        }
    });
}));

module.exports = router; 