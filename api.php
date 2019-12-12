<?php
/**
 * Example usage of the KrakenAPIClient library.
 *
 * See https://www.kraken.com/help/api for more info.
 *
 */

require_once 'KrakenAPIClient.php';
use Payward\KrakenAPI;

// your api credentials
$key = 'ZNF071loLh9s9JALPwLJPSmEYih3hfDl7rC4MXuY5TCdxhh01wCCjazs';
$secret = '2RkpORZrRrm7s2u+bXPb0oF9SWZEn5oEfwl6hTB8KodimZHsoITJOAPhud6y4RG1YnoEpbYfnNp+OKxLkRGqlw==';

// set which platform to use (currently only beta is operational, live available soon)
$beta = true;
$url = $beta ? 'https://api.beta.kraken.com' : 'https://api.kraken.com';
$sslverify = $beta ? false : true;
$version = 0;

$kraken = new KrakenAPI($key, $secret, $url, $version, $sslverify);

// Query a public list of active assets and their properties:
// $res = $kraken->QueryPublic('Assets');
// print_r($res);

// Query public ticker info for BTC/USD pair:
$res = $kraken->QueryPublic('Ticker', array('pair' => 'XBTCZUSD'));
print_r($res);
?>
