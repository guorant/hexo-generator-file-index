'use strict';

const pagination = require('hexo-pagination');

module.exports = function(locals) {
  const config = this.config;
  const posts = locals.posts.sort(config.index_generator.order_by);

  posts.data.sort((a, b) => (b.sticky || 0) - (a.sticky || 0));

  const paginationDir = config.pagination_dir || 'page';
  const path = config.index_generator.path || '';

  const page = locals.pages.data.find((item, index) => {
    return item.source == 'index.md' && item.path == 'index.html';
  });

  var _data = {
    __index: true,
  }
  if (page && page.content && page.content.length > 0) {
    _data.title = page.title;
    _data.date = page.date;
    _data.type = page.type;
    _data.layout = page.layout;
    _data.content = page.content;
    if (page.position) {
      _data.position = page.position;
    }
  }

  return pagination(path, posts, {
    perPage: config.index_generator.per_page,
    layout: ['index', 'archive'],
    format: paginationDir + '/%d/',
    data: _data
  });
};
