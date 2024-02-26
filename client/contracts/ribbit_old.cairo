%lang starknet
%builtins storage

from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.alloc import alloc
from starkware.cairo.common.serialize import serialize_word

@storage_var
func posts(post_id: felt) -> (poster: felt, content: felt):
end

@view
func get_post(post_id: felt) -> (poster: felt, content: felt):
    return (posts.read(post_id=post_id))
end

@external
func create_post(post_id: felt, poster: felt, content: felt):
    alloc_locals
    let (old_poster, old_content) = posts.read(post_id=post_id)
    assert old_poster = 0, "Post ID already used"

    posts.write(post_id=post_id, poster=poster, content=content)
    return ()
end
