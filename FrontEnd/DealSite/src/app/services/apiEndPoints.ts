//this class provdies all the available api end points on the backend.

export class dealsApi{
   static baseUrl = 'http://localhost:3000' ;
   static apiUrls  = {
        'allDeals' : dealsApi.baseUrl + '/routes/allDeals',
        'interestedProduct' : dealsApi.baseUrl + '/routes/recordInterestedProducts',
        'mostViewedDeals' : dealsApi.baseUrl + '/routes/recordInterestedProducts',
        'uploadDeals' : dealsApi.baseUrl + '/routes/uploadDeals',
        'registerAdvertiser' : dealsApi.baseUrl+ '/routes/registerAdvertiser'
    };
    

   
}