const axios = require("axios");

async function gettvdata  (req, res){


        try {

            const response = await axios.get(`${process.env.SITE_URL}tv?tmdb_id=${req.params.id}` );
            res.json(response.data);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Failed to fetch movie data' });
        }

}
async function getmoviedata  (req, res){


        try {

            const response = await axios.get(`${process.env.SITE_URL}movie?tmdb_id=${req.params.id}` );
            res.json(response.data);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Failed to fetch movie data' });
        }

}
async function getsimilarmovie  (req, res){


        try {

            const response = await axios.get(`${process.env.SITE_URLsimilar}?tmdb_id=${req.params.id}` );
            res.json(response.data);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Failed to fetch movie data' });
        }

}



module.exports = {gettvdata,getmoviedata,getsimilarmovie}