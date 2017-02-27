;(function() {

  'use strict';

  /**
   * Network Chart
   * @author Nimmymol Kalathil Sambasivan
   *
   * @example
   * <network-chart></network-chart>
   *
   */
  angular
    .module('boilerplate')
    .directive('networkChart', networkChartDirective);

  function networkChartDirective() {
    // Definition of directive
    var directive =  {
      restrict: 'E',
      scope:{
        networkData: '='
      },
      template: '<div id="network-container"></div>',
      link: link
    };

    return directive;

    function link(scope, element, attr) {
      var networkConnectionArr = [];
      var level = 1;
      var networkList = scope.networkData;

      for(var i =0; i< networkList.length; i++){
        var containerParent = getContainer(level);
        if(!document.getElementById('node-' + networkList[i].id)){
          $('<div>')
          .appendTo('#'+ containerParent)
          .attr('id', 'node-' + networkList[i].id)
          .text(networkList[i].name)
          .attr('tooltip', 'Employee ID - '+ networkList[i].id + '\n Department - ' + networkList[i].department)
          .addClass('flex-item');

          networkList[i].level = level;
        }

        var childLevel = false;
        for(var j=0; j< networkList[i].network.length; j++){
          
          var childNode = getObjects(networkList, 'id', networkList[i].network[j])[0];
          
          if(childNode){
            if(!document.getElementById('node-' + childNode.id)){
              if(!childLevel){
                level = level + 1;
                containerParent = getContainer(level);
              }
              else{
                containerParent = getContainer(level);
              }
              childLevel = true;
              $('<div>')
              .appendTo('#'+ containerParent)
              .attr('id', 'node-' + childNode.id)
              .text(childNode.name)
              .attr('tooltip', 'Employee ID - '+ childNode.id + '\n Department - ' + childNode.department)
              .addClass('flex-item');

              childNode.level = level;
            }
            else{
              if(childNode.level == networkList[i].level){
                $('#node-'+ childNode.id).remove();

                if(!childLevel){
                  level = level + 1;
                  containerParent = getContainer(level);
                }
                else{
                  containerParent = getContainer(level);
                }
                childLevel = true;

                $('<div>')
                .appendTo('#'+ containerParent)
                .attr('id', 'node-' + childNode.id)
                .text(childNode.name)
                .attr('tooltip', 'Employee ID - '+ childNode.id + '\n Department - ' + childNode.department)
                .addClass('flex-item');

                childNode.level = level;
              }
              else{
                level = level - 1;
              }
            }
            //Add connections to draw connections
            networkConnectionArr.push({
              from: document.getElementById('node-'+networkList[i].id),
              to: document.getElementById('node-'+childNode.id)
            })
          }
        }
        level++;
      }

      //Draw connections
      networkConnectionArr.forEach(function(connection){
        connect(connection.from,connection.to);
      });        
    }
    function getContainer(level){
      if(!document.getElementById('container-'+ level)){
        $('<div>')
        .appendTo('#network-container')
        .attr('id', 'container-' + level)
        .addClass('flex-container');
      }
      return 'container-' + level;
    }


    function connect(div1, div2) {
            var off1 = getOffset(div1);
            var off2 = getOffset(div2);
            // bottom right
            var x1 = off1.left + off1.width/2;
            var y1 = off1.top + off1.height/2;
            // top right
            var x2 = off2.left + off2.width/2;
            var y2 = off2.top + off2.height/2;
            
            var length = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
            var angle  = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
            var transform = 'rotate('+angle+'deg)';

            var line = $('<div>')
                .attr('id',div1.id +'-'+div2.id)
                .appendTo('#network-container')
                .addClass('line')
                .css({
                  'position': 'absolute',
                  'transform': transform
                })
                .width(length)
                .offset({left: x1 < x2 ? x1 : x1 - (x1-x2), top: y1 < y2 ? y1 : y1 - (y1-y2)});
        }

        function getOffset( el ) {
            var rect = el.getBoundingClientRect();
            return {
                left: rect.left + window.pageXOffset,
                top: rect.top + window.pageYOffset,
                width: rect.width || el.offsetWidth,
                height: rect.height || el.offsetHeight
            };
        }
        function getObjects(obj, key, val) {
            var objects = [];
            for (var i in obj) {
                if (!obj.hasOwnProperty(i)) continue;
                if (typeof obj[i] == 'object') {
                    objects = objects.concat(getObjects(obj[i], key, val));
                } else if (i == key && obj[key] == val) {
                    objects.push(obj);
                }
            }
            return objects;
        }
  }

})();