import React, {useState} from 'react'
import {Card} from 'react-bootstrap'
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import moment from 'moment';
import { useGetCryptosQuery } from '../services/cryptoApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Select} from 'antd'
import { Audio } from 'react-loader-spinner'


const News = ({simplified}) => {
  const {Option} = Select;
const demoImage = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg';

  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
  const {data: cryptoNews} = useGetCryptoNewsQuery({newsCategory, count: simplified ? 6 : 18});
  const {data} = useGetCryptosQuery(30);
  if(!cryptoNews?.value) return (
    <div style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
      <Audio/>
    </div>
  );

  return (
    <div>
      {!simplified && (

          <div className="coin-selector">

          
              <Select
                showSearch
                className='select-news'  
                placeholder='Select a Crypto'
                optionFilterProp='children'
                style={{width:"300px"}}
                onChange={(value) => setNewsCategory(value)}
                filderOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {/* <div id="coin-selector"> */}
                    <Option value="Cryptocurrency" >Select a Coin</Option>
                    {data?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}
                {/* </div> */}
              </Select>
              </div>
      )}
        <div className="d-grid gap-4" style={{gridTemplateColumns: "repeat(auto-fill, 16rem)"}}>
            {cryptoNews.value.map((article, i) => (
                  <Card className="news-card" key={i}>
                    <a href={article.url} target="_blank" rel="noreferrer">
                      <div className="news-image-container">
                        <Card.Title className="news-title" >{article.name}</Card.Title>
                        <Card.Img style={{maxWidth:'150px', maxHeight: '100px'}} src={article?.image?.thumbnail?.contentUrl}  />
                      </div>
                      <p>
                      </p>
                      <div className="provider-container">
                        <div>
                          <Card.Img src={article.provider[0]?.image?.thumbnail?.contentUrl || demoImage} style={{width:"50px"}} />
                          <Card.Text className="provider-name">{article.provider[0]?.name}</Card.Text>
                        </div>
                          <Card.Text>{moment(article.datePublished).startOf('ss').fromNow()}</Card.Text>
                      </div>
                    </a>
                  </Card>

            ))}
        </div>

    </div>
  )
}

export default News;