const db = require('../../models/')
const fs = require('fs')

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: files } = data
    const currentPage = page ? +page : 1
    const totalPages = Math.ceil(totalItems / limit)

    return { totalItems, files, totalPages, currentPage }
}

const getPagination = (page, list_size) => {
    const limit = list_size ? +list_size : 10
    const offset = page ? (page - 1) * limit : 0
    return { limit, offset }
}

exports.upload = async function(req, res) {
    try {
        const newFile = {
            file_name: req.files.file.name,
            file_path: req.files.file.tempFilePath,
            MIME: req.files.file.mimetype,
            size: req.files.file.size
        }
        await db.Files.create(newFile).then(result => {
            res.status(200).json(result)
        }).catch(e => {
            res.json(e.message)
        });
    } catch (e) {
        res.status(300).json(e.message)
    }
}

exports.list = async function(req, res) {
    try {
        const { page, list_size } = req.query
        const { limit, offset } = getPagination(page, list_size)
        await db.Files.findAndCountAll({ limit, offset }).then(result => {
            const response = getPagingData(result, page, limit);
            res.status(200).json(response)
        }).catch(e => {
            res.json(e.message)
        });
    } catch (e) {
        res.status(300).json(e.message)
    }
}

exports.get = async function(req, res) {
    try {
        await db.Files.findByPk(req.params.id).then(result => {
            res.status(200).json(result)
        }).catch(e => {
            res.json(e.message)
        });
    } catch (e) {
        res.status(300).json(e.message)
    }
}

exports.delete = async function(req, res) {
    try {
        let path = await db.Files.findByPk(req.params.id)
        await db.Files.destroy({
            where: {
                id: req.params.id
            }
        }).then(result => {
            fs.unlink(path.file_path, (err) => {
                if (err) return res.status(400).json(err)
            })
            res.status(200).json(result)
        }).catch(e => {
            res.json(e.message)
        });
    } catch (e) {
        res.status(300).json(e.message)
    }
}

exports.update = async function(req, res) {
    try {
        let path = await db.Files.findByPk(req.params.id)

        const upadateFile = {
            file_name: req.files.file.name,
            file_path: req.files.file.tempFilePath,
            MIME: req.files.file.mimetype,
            size: req.files.file.size
        }
        await db.Files.update(
            upadateFile, {
                where: { id: req.params.id }
            }
        ).then(result => {
            fs.unlink(path.file_path, (err) => {
                if (err) return res.status(400).json(err)
            })
            res.status(200).json(result)
        }).catch(e => {
            res.json(e.message)
        })
    } catch (e) {
        res.status(300).json(e.message)
    }
}

exports.download = async function(req, res) {
    try {
        await db.Files.findByPk(req.params.id).then(result => {
            res.status(200).download(result.file_path)
        }).catch(e => {
            res.json(e.message)
        });
    } catch (e) {
        res.status(300).json(e.message)
    }
}