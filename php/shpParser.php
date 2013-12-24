<?php

 
class shpParser {
  private $shpFilePath;
  private $shpFile;
  private $headerInfo = array();
  private $shpData = array();
  
  public function load($path) {
    $this->shpFilePath = $path;
    $this->shpFile = fopen($this->shpFilePath, "rb");
    $this->loadHeaders();
    
    $shpData = $this->loadRecords();
  }
  
  public function headerInfo() {
    return $this->headerInfo;
  }
  
  public function getShapeData() {
    return $this->shpData;
  }
  
  private function geomTypes() {
    return array(
      0  => 'Null Shape',
      1  => 'Point',
      3  => 'PolyLine',
      5  => 'Polygon',
      8  => 'MultiPoint',
      11 => 'PointZ',
      13 => 'PolyLineZ',
      15 => 'PolygonZ',
      18 => 'MultiPointZ',
      21 => 'PointM',
      23 => 'PolyLineM',
      25 => 'PolygonM',
      28 => 'MultiPointM',
      31 => 'MultiPatch',
    );
  }
  
  private function geoTypeFromID($id) {
    $geomTypes = $this->geomTypes();
    
    if (isset($geomTypes[$id])) {
      return $geomTypes[$id];
    }
    
    return NULL;
  }
  
  private function loadHeaders() {
    fseek($this->shpFile, 24, SEEK_SET);
    $length = $this->loadData("N");
    fseek($this->shpFile, 32, SEEK_SET);
    $shape_type = $this->geoTypeFromID($this->loadData("V"));
    
    $bounding_box = array();
    $bounding_box["xmin"] = $this->loadData("d");
    $bounding_box["ymin"] = $this->loadData("d");
    $bounding_box["xmax"] = $this->loadData("d");
    $bounding_box["ymax"] = $this->loadData("d");
    
    $this->headerInfo = array(
      'length' => $length,
      'shapeType' => $shape_type,
      'boundingBox' => $bounding_box,
    );
  }
  
  private function loadRecords() {
    fseek($this->shpFile, 100);
    
    while(!feof($this->shpFile)) {
      $records = array(
        'geom' => $this->loadRecord(),
      );
      if (!empty($records['geom'])) {
        $this->shpData[] = $records;
      }
    }
  }
  

  
  private function loadData($type) {
    $type_length = $this->loadDataLength($type);
    if ($type_length) {
      $fread_return = fread($this->shpFile, $type_length);
      if ($fread_return != '') {
        $tmp = unpack($type, $fread_return);
        return current($tmp);
      }
    }
    
    return NULL;
  }
  
  // shpRecord functions.
  private function loadRecord() {
    $recordNumber = $this->loadData("N");
    $this->loadData("N"); // unnecessary data.
    $shapeType = $this->loadData("V");
    
    switch($shapeType) {
      case 0:
        return $this->loadNullRecord();
        break;
      case 1:
        return $this->loadPointRecord();
        break;
      case 3:
        return $this->loadPolyLineRecord();
        break;
      case 5:
        return $this->loadPolygonRecord();
        break;
      case 8:
        return $this->loadMultiPointRecord();
        break;
      default:
        // $setError(sprintf("The Shape Type '%s' is not supported.", $shapeType));
        break;
    }
  }
  
  private function loadPoint() {
    $data = array();
    $data['x'] = $this->loadData("d");
    $data['y'] = $this->loadData("d");
    return $data;
  }
  
  private function loadNullRecord() {
    return array();
  }
  
  